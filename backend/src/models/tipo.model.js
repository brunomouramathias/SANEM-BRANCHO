const { pool } = require('../config/database');

class TipoModel {
  // Buscar todos os tipos
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM Tipo ORDER BY TP_Descricao');
    return rows.map(row => ({
      id: row.TP_IDTipo,
      descricao: row.TP_Descricao
    }));
  }

  // Buscar por ID
  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM Tipo WHERE TP_IDTipo = ?', [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: row.TP_IDTipo,
      descricao: row.TP_Descricao
    };
  }

  // Criar novo tipo
  static async create(data) {
    const { descricao } = data;
    const [result] = await pool.query(
      'INSERT INTO Tipo (TP_Descricao) VALUES (?)',
      [descricao]
    );
    return { id: result.insertId, descricao };
  }

  // Atualizar tipo
  static async update(id, data) {
    const { descricao } = data;
    await pool.query(
      'UPDATE Tipo SET TP_Descricao = ? WHERE TP_IDTipo = ?',
      [descricao, id]
    );
    return this.findById(id);
  }

  // Deletar tipo
  static async delete(id) {
    const [result] = await pool.query('DELETE FROM Tipo WHERE TP_IDTipo = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = TipoModel;

