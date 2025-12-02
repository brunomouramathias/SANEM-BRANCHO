const { pool } = require('../config/database');

class RelatorioController {
  // Dashboard - estatísticas gerais
  static async dashboard(req, res) {
    try {
      // Total de beneficiários
      const [beneficiarios] = await pool.query('SELECT COUNT(*) as total FROM Beneficiario');
      
      // Total de itens em estoque
      const [estoque] = await pool.query('SELECT SUM(CAST(ES_Quantidade AS SIGNED)) as total FROM Estoque');
      
      // Total de doações recebidas
      const [recebidas] = await pool.query('SELECT COUNT(*) as total, SUM(DR_Quantidade) as quantidade FROM Doacao_Recebida');
      
      // Total de doações enviadas
      const [enviadas] = await pool.query('SELECT COUNT(*) as total, SUM(CAST(DE_Quantidade AS SIGNED)) as quantidade FROM Doacao_Enviada');
      
      // Itens com estoque baixo
      const [estoqueBaixo] = await pool.query(`
        SELECT COUNT(*) as total FROM Estoque WHERE CAST(ES_Quantidade AS SIGNED) < 10
      `);

      return res.json({
        totalBeneficiarios: beneficiarios[0].total,
        totalEstoque: estoque[0].total || 0,
        doacoesRecebidas: {
          total: recebidas[0].total,
          quantidade: recebidas[0].quantidade || 0
        },
        doacoesEnviadas: {
          total: enviadas[0].total,
          quantidade: enviadas[0].quantidade || 0
        },
        itensEstoqueBaixo: estoqueBaixo[0].total
      });
    } catch (error) {
      console.error('Erro ao gerar dashboard:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Relatório de doações por período
  static async doacoesPorPeriodo(req, res) {
    try {
      const { dataInicio, dataFim, tipo } = req.query;

      let queryRecebidas = `
        SELECT dr.*, o.Op_Nome, t.TP_Descricao
        FROM Doacao_Recebida dr
        LEFT JOIN Operaor o ON dr.DR_Operador = o.ID_Operador
        LEFT JOIN Tipo t ON dr.DR_Tipo = t.TP_IDTipo
        WHERE 1=1
      `;

      let queryEnviadas = `
        SELECT de.*, b.Bn_Nome, o.Op_Nome, t.TP_Descricao
        FROM Doacao_Enviada de
        LEFT JOIN Beneficiario b ON de.DE_idBeneficiario = b.idBeneficiario
        LEFT JOIN Operaor o ON de.DE_Operador = o.ID_Operador
        LEFT JOIN Tipo t ON de.DE_Tipo = t.TP_IDTipo
        WHERE 1=1
      `;

      const paramsRecebidas = [];
      const paramsEnviadas = [];

      if (dataInicio) {
        queryRecebidas += ' AND dr.DR_Data >= ?';
        queryEnviadas += ' AND de.DE_Data >= ?';
        paramsRecebidas.push(dataInicio);
        paramsEnviadas.push(dataInicio);
      }

      if (dataFim) {
        queryRecebidas += ' AND dr.DR_Data <= ?';
        queryEnviadas += ' AND de.DE_Data <= ?';
        paramsRecebidas.push(dataFim);
        paramsEnviadas.push(dataFim);
      }

      if (tipo) {
        queryRecebidas += ' AND dr.DR_Tipo = ?';
        queryEnviadas += ' AND de.DE_Tipo = ?';
        paramsRecebidas.push(tipo);
        paramsEnviadas.push(tipo);
      }

      queryRecebidas += ' ORDER BY dr.DR_Data DESC';
      queryEnviadas += ' ORDER BY de.DE_Data DESC';

      const [recebidas] = await pool.query(queryRecebidas, paramsRecebidas);
      const [enviadas] = await pool.query(queryEnviadas, paramsEnviadas);

      return res.json({
        recebidas: recebidas.map(r => ({
          id: r.DR_IDDoacao,
          quantidade: r.DR_Quantidade,
          data: r.DR_Data,
          operador: r.Op_Nome,
          tipo: r.TP_Descricao
        })),
        enviadas: enviadas.map(e => ({
          id: e.Doacao_Enviada,
          quantidade: e.DE_Quantidade,
          data: e.DE_Data,
          beneficiario: e.Bn_Nome,
          operador: e.Op_Nome,
          tipo: e.TP_Descricao
        }))
      });
    } catch (error) {
      console.error('Erro ao gerar relatório por período:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Relatório por beneficiário
  static async porBeneficiario(req, res) {
    try {
      const { beneficiarioId } = req.params;

      const [beneficiario] = await pool.query(
        'SELECT * FROM Beneficiario WHERE idBeneficiario = ?',
        [beneficiarioId]
      );

      if (beneficiario.length === 0) {
        return res.status(404).json({ error: 'Beneficiário não encontrado' });
      }

      const [doacoes] = await pool.query(`
        SELECT de.*, t.TP_Descricao, o.Op_Nome
        FROM Doacao_Enviada de
        LEFT JOIN Tipo t ON de.DE_Tipo = t.TP_IDTipo
        LEFT JOIN Operaor o ON de.DE_Operador = o.ID_Operador
        WHERE de.DE_idBeneficiario = ?
        ORDER BY de.DE_Data DESC
      `, [beneficiarioId]);

      return res.json({
        beneficiario: {
          id: beneficiario[0].idBeneficiario,
          nome: beneficiario[0].Bn_Nome,
          documento: beneficiario[0].Bn_documento,
          telefone: beneficiario[0].Bn_Telefone
        },
        totalDoacoes: doacoes.length,
        doacoes: doacoes.map(d => ({
          id: d.Doacao_Enviada,
          quantidade: d.DE_Quantidade,
          data: d.DE_Data,
          tipo: d.TP_Descricao,
          operador: d.Op_Nome
        }))
      });
    } catch (error) {
      console.error('Erro ao gerar relatório por beneficiário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Relatório de distribuição mensal
  static async distribuicaoMensal(req, res) {
    try {
      const [resultado] = await pool.query(`
        SELECT 
          DATE_FORMAT(DE_Data, '%Y-%m') as mes,
          COUNT(*) as totalDoacoes,
          SUM(CAST(DE_Quantidade AS SIGNED)) as totalQuantidade
        FROM Doacao_Enviada
        GROUP BY DATE_FORMAT(DE_Data, '%Y-%m')
        ORDER BY mes DESC
        LIMIT 12
      `);

      return res.json(resultado.map(r => ({
        mes: r.mes,
        totalDoacoes: r.totalDoacoes,
        totalQuantidade: r.totalQuantidade || 0
      })));
    } catch (error) {
      console.error('Erro ao gerar relatório mensal:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = RelatorioController;

