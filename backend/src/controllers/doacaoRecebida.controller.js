const DoacaoRecebidaModel = require('../models/doacaoRecebida.model');

class DoacaoRecebidaController {
  // Listar todas
  static async index(req, res) {
    try {
      const doacoes = await DoacaoRecebidaModel.findAll();
      return res.json(doacoes);
    } catch (error) {
      console.error('Erro ao listar doações recebidas:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Buscar por ID
  static async show(req, res) {
    try {
      const { id } = req.params;
      const doacao = await DoacaoRecebidaModel.findById(id);
      
      if (!doacao) {
        return res.status(404).json({ error: 'Doação não encontrada' });
      }

      return res.json(doacao);
    } catch (error) {
      console.error('Erro ao buscar doação:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Criar nova
  static async store(req, res) {
    try {
      const { quantidade, tipoId, estoqueId } = req.body;
      const operadorId = req.userId;

      if (!quantidade || !tipoId) {
        return res.status(400).json({ error: 'Quantidade e tipo são obrigatórios' });
      }

      const doacao = await DoacaoRecebidaModel.create({ 
        operadorId, 
        quantidade, 
        tipoId, 
        estoqueId 
      });
      return res.status(201).json(doacao);
    } catch (error) {
      console.error('Erro ao criar doação:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Deletar
  static async destroy(req, res) {
    try {
      const { id } = req.params;

      const existente = await DoacaoRecebidaModel.findById(id);
      if (!existente) {
        return res.status(404).json({ error: 'Doação não encontrada' });
      }

      await DoacaoRecebidaModel.delete(id);
      return res.json({ message: 'Doação removida com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar doação:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = DoacaoRecebidaController;

