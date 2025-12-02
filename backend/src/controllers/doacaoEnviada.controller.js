const DoacaoEnviadaModel = require('../models/doacaoEnviada.model');

class DoacaoEnviadaController {
  // Listar todas
  static async index(req, res) {
    try {
      const doacoes = await DoacaoEnviadaModel.findAll();
      return res.json(doacoes);
    } catch (error) {
      console.error('Erro ao listar doações enviadas:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Buscar por ID
  static async show(req, res) {
    try {
      const { id } = req.params;
      const doacao = await DoacaoEnviadaModel.findById(id);
      
      if (!doacao) {
        return res.status(404).json({ error: 'Doação não encontrada' });
      }

      return res.json(doacao);
    } catch (error) {
      console.error('Erro ao buscar doação:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Buscar por beneficiário
  static async byBeneficiario(req, res) {
    try {
      const { beneficiarioId } = req.params;
      const doacoes = await DoacaoEnviadaModel.findByBeneficiario(beneficiarioId);
      return res.json(doacoes);
    } catch (error) {
      console.error('Erro ao buscar doações por beneficiário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Criar nova
  static async store(req, res) {
    try {
      const { quantidade, beneficiarioId, tipoId, estoqueId } = req.body;
      const operadorId = req.userId;

      if (!quantidade || !beneficiarioId || !tipoId) {
        return res.status(400).json({ error: 'Quantidade, beneficiário e tipo são obrigatórios' });
      }

      const doacao = await DoacaoEnviadaModel.create({ 
        quantidade, 
        beneficiarioId, 
        operadorId, 
        tipoId, 
        estoqueId 
      });
      return res.status(201).json(doacao);
    } catch (error) {
      console.error('Erro ao criar doação:', error);
      if (error.message === 'Estoque insuficiente') {
        return res.status(400).json({ error: 'Estoque insuficiente' });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Deletar
  static async destroy(req, res) {
    try {
      const { id } = req.params;

      const existente = await DoacaoEnviadaModel.findById(id);
      if (!existente) {
        return res.status(404).json({ error: 'Doação não encontrada' });
      }

      await DoacaoEnviadaModel.delete(id);
      return res.json({ message: 'Doação removida com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar doação:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = DoacaoEnviadaController;

