const { pool } = require('../config/database');

class BeneficiarioModel {
  // Buscar todos os beneficiários
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM Beneficiario ORDER BY Bn_Nome');
    return rows.map(row => ({
      id: row.idBeneficiario,
      nome: row.Bn_Nome,
      documento: row.Bn_documento,
      telefone: row.Bn_Telefone
    }));
  }

  // Buscar por ID
  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM Beneficiario WHERE idBeneficiario = ?', [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: row.idBeneficiario,
      nome: row.Bn_Nome,
      documento: row.Bn_documento,
      telefone: row.Bn_Telefone
    };
  }

  // Criar novo beneficiário
  static async create(data) {
    const { nome, documento, telefone } = data;
    const [result] = await pool.query(
      'INSERT INTO Beneficiario (Bn_Nome, Bn_documento, Bn_Telefone) VALUES (?, ?, ?)',
      [nome, documento, telefone]
    );
    return { id: result.insertId, nome, documento, telefone };
  }

  // Atualizar beneficiário
  static async update(id, data) {
    const { nome, documento, telefone } = data;
    await pool.query(
      'UPDATE Beneficiario SET Bn_Nome = ?, Bn_documento = ?, Bn_Telefone = ? WHERE idBeneficiario = ?',
      [nome, documento, telefone, id]
    );
    return this.findById(id);
  }

  // Deletar beneficiário
  static async delete(id) {
    const [result] = await pool.query('DELETE FROM Beneficiario WHERE idBeneficiario = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = BeneficiarioModel;

