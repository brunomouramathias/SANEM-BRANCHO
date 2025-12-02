const express = require('express');
const DoacaoRecebidaController = require('../controllers/doacaoRecebida.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Todas as rotas são protegidas
router.use(authMiddleware);

router.get('/', DoacaoRecebidaController.index);
router.get('/:id', DoacaoRecebidaController.show);
router.post('/', DoacaoRecebidaController.store);
router.delete('/:id', DoacaoRecebidaController.destroy);

module.exports = router;

