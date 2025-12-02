const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

class OperadorModel {
  // Buscar todos os operadores
  static async findAll() {
    const [rows] = await pool.query('SELECT ID_Operador, Op_Nome, Op_Documento, Op_Email, Op_Tipo FROM Operaor ORDER BY Op_Nome');
    return rows.map(row => ({
      id: row.ID_Operador,
      nome: row.Op_Nome,
      documento: row.Op_Documento,
      email: row.Op_Email,
      tipo: row.Op_Tipo
    }));
  }

  // Buscar por ID
  static async findById(id) {
    const [rows] = await pool.query(
      'SELECT ID_Operador, Op_Nome, Op_Documento, Op_Email, Op_Tipo FROM Operaor WHERE ID_Operador = ?',
      [id]
    );
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: row.ID_Operador,
      nome: row.Op_Nome,
      documento: row.Op_Documento,
      email: row.Op_Email,
      tipo: row.Op_Tipo
    };
  }

  // Buscar por email (para login)
  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM Operaor WHERE Op_Email = ?', [email]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: row.ID_Operador,
      nome: row.Op_Nome,
      documento: row.Op_Documento,
      email: row.Op_Email,
      senha: row.Op_Senha,
      tipo: row.Op_Tipo
    };
  }

  // Criar novo operador
  static async create(data) {
    const { nome, documento, email, senha, tipo } = data;
    const hashedPassword = await bcrypt.hash(senha, 10);
    const [result] = await pool.query(
      'INSERT INTO Operaor (Op_Nome, Op_Documento, Op_Email, Op_Senha, Op_Tipo) VALUES (?, ?, ?, ?, ?)',
      [nome, documento, email, hashedPassword, tipo || 1]
    );
    return { id: result.insertId, nome, documento, email, tipo: tipo || 1 };
  }

  // Atualizar operador
  static async update(id, data) {
    const { nome, documento, email, tipo } = data;
    await pool.query(
      'UPDATE Operaor SET Op_Nome = ?, Op_Documento = ?, Op_Email = ?, Op_Tipo = ? WHERE ID_Operador = ?',
      [nome, documento, email, tipo, id]
    );
    return this.findById(id);
  }

  // Atualizar senha
  static async updatePassword(id, novaSenha) {
    const hashedPassword = await bcrypt.hash(novaSenha, 10);
    await pool.query('UPDATE Operaor SET Op_Senha = ? WHERE ID_Operador = ?', [hashedPassword, id]);
    return true;
  }

  // Deletar operador
  static async delete(id) {
    const [result] = await pool.query('DELETE FROM Operaor WHERE ID_Operador = ?', [id]);
    return result.affectedRows > 0;
  }

  // Verificar senha
  static async verifyPassword(senha, hashedSenha) {
    return bcrypt.compare(senha, hashedSenha);
  }
}

module.exports = OperadorModel;

