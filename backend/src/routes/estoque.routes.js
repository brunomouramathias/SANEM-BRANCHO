const express = require('express');
const EstoqueController = require('../controllers/estoque.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Todas as rotas são protegidas
router.use(authMiddleware);

router.get('/', EstoqueController.index);
router.get('/baixo', EstoqueController.lowStock);
router.get('/:id', EstoqueController.show);
router.post('/', EstoqueController.store);
router.put('/:id', EstoqueController.update);
router.delete('/:id', EstoqueController.destroy);

module.exports = router;

