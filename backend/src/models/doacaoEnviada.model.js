const { pool } = require('../config/database');

class DoacaoEnviadaModel {
  // Buscar todas as doações enviadas
  static async findAll() {
    const [rows] = await pool.query(`
      SELECT de.*, b.Bn_Nome, o.Op_Nome, t.TP_Descricao
      FROM Doacao_Enviada de
      LEFT JOIN Beneficiario b ON de.DE_idBeneficiario = b.idBeneficiario
      LEFT JOIN Operaor o ON de.DE_Operador = o.ID_Operador
      LEFT JOIN Tipo t ON de.DE_Tipo = t.TP_IDTipo
      ORDER BY de.DE_Data DESC
    `);
    return rows.map(row => ({
      id: row.Doacao_Enviada,
      quantidade: row.DE_Quantidade,
      data: row.DE_Data,
      beneficiarioId: row.DE_idBeneficiario,
      beneficiarioNome: row.Bn_Nome,
      operadorId: row.DE_Operador,
      operadorNome: row.Op_Nome,
      tipoId: row.DE_Tipo,
      tipoDescricao: row.TP_Descricao
    }));
  }

  // Buscar por ID
  static async findById(id) {
    const [rows] = await pool.query(`
      SELECT de.*, b.Bn_Nome, o.Op_Nome, t.TP_Descricao
      FROM Doacao_Enviada de
      LEFT JOIN Beneficiario b ON de.DE_idBeneficiario = b.idBeneficiario
      LEFT JOIN Operaor o ON de.DE_Operador = o.ID_Operador
      LEFT JOIN Tipo t ON de.DE_Tipo = t.TP_IDTipo
      WHERE de.Doacao_Enviada = ?
    `, [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: row.Doacao_Enviada,
      quantidade: row.DE_Quantidade,
      data: row.DE_Data,
      beneficiarioId: row.DE_idBeneficiario,
      beneficiarioNome: row.Bn_Nome,
      operadorId: row.DE_Operador,
      operadorNome: row.Op_Nome,
      tipoId: row.DE_Tipo,
      tipoDescricao: row.TP_Descricao
    };
  }

  // Buscar por beneficiário
  static async findByBeneficiario(beneficiarioId) {
    const [rows] = await pool.query(`
      SELECT de.*, b.Bn_Nome, o.Op_Nome, t.TP_Descricao
      FROM Doacao_Enviada de
      LEFT JOIN Beneficiario b ON de.DE_idBeneficiario = b.idBeneficiario
      LEFT JOIN Operaor o ON de.DE_Operador = o.ID_Operador
      LEFT JOIN Tipo t ON de.DE_Tipo = t.TP_IDTipo
      WHERE de.DE_idBeneficiario = ?
      ORDER BY de.DE_Data DESC
    `, [beneficiarioId]);
    return rows.map(row => ({
      id: row.Doacao_Enviada,
      quantidade: row.DE_Quantidade,
      data: row.DE_Data,
      beneficiarioId: row.DE_idBeneficiario,
      beneficiarioNome: row.Bn_Nome,
      operadorId: row.DE_Operador,
      operadorNome: row.Op_Nome,
      tipoId: row.DE_Tipo,
      tipoDescricao: row.TP_Descricao
    }));
  }

  // Criar nova doação enviada
  static async create(data) {
    const { quantidade, beneficiarioId, operadorId, tipoId, estoqueId } = data;
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Verificar estoque disponível
      if (estoqueId) {
        const [estoque] = await connection.query(
          'SELECT ES_Quantidade FROM Estoque WHERE ES_Estoque = ?',
          [estoqueId]
        );
        
        if (estoque.length === 0 || parseInt(estoque[0].ES_Quantidade) < quantidade) {
          throw new Error('Estoque insuficiente');
        }
      }

      // Inserir doação enviada
      const [result] = await connection.query(
        'INSERT INTO Doacao_Enviada (DE_Quantidade, DE_Data, DE_idBeneficiario, DE_Operador, DE_Tipo) VALUES (?, NOW(), ?, ?, ?)',
        [quantidade, beneficiarioId, operadorId, tipoId]
      );

      // Relacionar com estoque
      if (estoqueId) {
        await connection.query(
          'INSERT INTO Doacao_Enviada_Estoque (DES_Enviada, Estoque_ES_Estoque) VALUES (?, ?)',
          [result.insertId, estoqueId]
        );

        // Decrementar quantidade no estoque
        await connection.query(
          'UPDATE Estoque SET ES_Quantidade = ES_Quantidade - ? WHERE ES_Estoque = ?',
          [quantidade, estoqueId]
        );
      }

      await connection.commit();
      return this.findById(result.insertId);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Deletar doação enviada
  static async delete(id) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Remover relacionamentos
      await connection.query('DELETE FROM Doacao_Enviada_Estoque WHERE DES_Enviada = ?', [id]);
      
      // Remover doação
      const [result] = await connection.query('DELETE FROM Doacao_Enviada WHERE Doacao_Enviada = ?', [id]);

      await connection.commit();
      return result.affectedRows > 0;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = DoacaoEnviadaModel;

