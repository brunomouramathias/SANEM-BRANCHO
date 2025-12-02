const BeneficiarioModel = require('../models/beneficiario.model');

class BeneficiarioController {
  // Listar todos
  static async index(req, res) {
    try {
      const beneficiarios = await BeneficiarioModel.findAll();
      return res.json(beneficiarios);
    } catch (error) {
      console.error('Erro ao listar beneficiários:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Buscar por ID
  static async show(req, res) {
    try {
      const { id } = req.params;
      const beneficiario = await BeneficiarioModel.findById(id);
      
      if (!beneficiario) {
        return res.status(404).json({ error: 'Beneficiário não encontrado' });
      }

      return res.json(beneficiario);
    } catch (error) {
      console.error('Erro ao buscar beneficiário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Criar novo
  static async store(req, res) {
    try {
      const { nome, documento, telefone } = req.body;

      if (!nome) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
      }

      const beneficiario = await BeneficiarioModel.create({ nome, documento, telefone });
      return res.status(201).json(beneficiario);
    } catch (error) {
      console.error('Erro ao criar beneficiário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Atualizar
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, documento, telefone } = req.body;

      const existente = await BeneficiarioModel.findById(id);
      if (!existente) {
        return res.status(404).json({ error: 'Beneficiário não encontrado' });
      }

      const beneficiario = await BeneficiarioModel.update(id, { nome, documento, telefone });
      return res.json(beneficiario);
    } catch (error) {
      console.error('Erro ao atualizar beneficiário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Deletar
  static async destroy(req, res) {
    try {
      const { id } = req.params;

      const existente = await BeneficiarioModel.findById(id);
      if (!existente) {
        return res.status(404).json({ error: 'Beneficiário não encontrado' });
      }

      await BeneficiarioModel.delete(id);
      return res.json({ message: 'Beneficiário removido com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar beneficiário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = BeneficiarioController;

