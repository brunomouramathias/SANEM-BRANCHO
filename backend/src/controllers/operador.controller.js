const OperadorModel = require('../models/operador.model');

class OperadorController {
  // Listar todos
  static async index(req, res) {
    try {
      const operadores = await OperadorModel.findAll();
      return res.json(operadores);
    } catch (error) {
      console.error('Erro ao listar operadores:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Buscar por ID
  static async show(req, res) {
    try {
      const { id } = req.params;
      const operador = await OperadorModel.findById(id);
      
      if (!operador) {
        return res.status(404).json({ error: 'Operador não encontrado' });
      }

      return res.json(operador);
    } catch (error) {
      console.error('Erro ao buscar operador:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Criar novo
  static async store(req, res) {
    try {
      const { nome, documento, email, senha, tipo } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
      }

      // Verificar email duplicado
      const existente = await OperadorModel.findByEmail(email);
      if (existente) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      const operador = await OperadorModel.create({ nome, documento, email, senha, tipo });
      return res.status(201).json(operador);
    } catch (error) {
      console.error('Erro ao criar operador:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Atualizar
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, documento, email, tipo } = req.body;

      const existente = await OperadorModel.findById(id);
      if (!existente) {
        return res.status(404).json({ error: 'Operador não encontrado' });
      }

      const operador = await OperadorModel.update(id, { nome, documento, email, tipo });
      return res.json(operador);
    } catch (error) {
      console.error('Erro ao atualizar operador:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Atualizar senha
  static async updatePassword(req, res) {
    try {
      const { id } = req.params;
      const { novaSenha } = req.body;

      if (!novaSenha) {
        return res.status(400).json({ error: 'Nova senha é obrigatória' });
      }

      const existente = await OperadorModel.findById(id);
      if (!existente) {
        return res.status(404).json({ error: 'Operador não encontrado' });
      }

      await OperadorModel.updatePassword(id, novaSenha);
      return res.json({ message: 'Senha atualizada com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Deletar
  static async destroy(req, res) {
    try {
      const { id } = req.params;

      const existente = await OperadorModel.findById(id);
      if (!existente) {
        return res.status(404).json({ error: 'Operador não encontrado' });
      }

      await OperadorModel.delete(id);
      return res.json({ message: 'Operador removido com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar operador:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = OperadorController;

