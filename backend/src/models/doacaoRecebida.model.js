const { pool } = require('../config/database');

class DoacaoRecebidaModel {
  // Buscar todas as doações recebidas
  static async findAll() {
    const [rows] = await pool.query(`
      SELECT dr.*, o.Op_Nome, t.TP_Descricao
      FROM Doacao_Recebida dr
      LEFT JOIN Operaor o ON dr.DR_Operador = o.ID_Operador
      LEFT JOIN Tipo t ON dr.DR_Tipo = t.TP_IDTipo
      ORDER BY dr.DR_Data DESC
    `);
    return rows.map(row => ({
      id: row.DR_IDDoacao,
      operadorId: row.DR_Operador,
      operadorNome: row.Op_Nome,
      quantidade: row.DR_Quantidade,
      data: row.DR_Data,
      tipoId: row.DR_Tipo,
      tipoDescricao: row.TP_Descricao
    }));
  }

  // Buscar por ID
  static async findById(id) {
    const [rows] = await pool.query(`
      SELECT dr.*, o.Op_Nome, t.TP_Descricao
      FROM Doacao_Recebida dr
      LEFT JOIN Operaor o ON dr.DR_Operador = o.ID_Operador
      LEFT JOIN Tipo t ON dr.DR_Tipo = t.TP_IDTipo
      WHERE dr.DR_IDDoacao = ?
    `, [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: row.DR_IDDoacao,
      operadorId: row.DR_Operador,
      operadorNome: row.Op_Nome,
      quantidade: row.DR_Quantidade,
      data: row.DR_Data,
      tipoId: row.DR_Tipo,
      tipoDescricao: row.TP_Descricao
    };
  }

  // Criar nova doação recebida
  static async create(data) {
    const { operadorId, quantidade, tipoId, estoqueId } = data;
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Inserir doação
      const [result] = await connection.query(
        'INSERT INTO Doacao_Recebida (DR_Operador, DR_Quantidade, DR_Data, DR_Tipo) VALUES (?, ?, NOW(), ?)',
        [operadorId, quantidade, tipoId]
      );

      // Relacionar com estoque
      if (estoqueId) {
        await connection.query(
          'INSERT INTO Doacao_Recebida_Estoque (DRE_IDDoacao, DRE_Estoque) VALUES (?, ?)',
          [result.insertId, estoqueId]
        );

        // Atualizar quantidade no estoque
        await connection.query(
          'UPDATE Estoque SET ES_Quantidade = ES_Quantidade + ? WHERE ES_Estoque = ?',
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

  // Deletar doação recebida
  static async delete(id) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Remover relacionamentos
      await connection.query('DELETE FROM Doacao_Recebida_Estoque WHERE DRE_IDDoacao = ?', [id]);
      
      // Remover doação
      const [result] = await connection.query('DELETE FROM Doacao_Recebida WHERE DR_IDDoacao = ?', [id]);

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

module.exports = DoacaoRecebidaModel;

