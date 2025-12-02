const express = require('express');
const OperadorController = require('../controllers/operador.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Todas as rotas são protegidas
router.use(authMiddleware);

router.get('/', OperadorController.index);
router.get('/:id', OperadorController.show);
router.post('/', OperadorController.store);
router.put('/:id', OperadorController.update);
router.put('/:id/senha', OperadorController.updatePassword);
router.delete('/:id', OperadorController.destroy);

module.exports = router;

