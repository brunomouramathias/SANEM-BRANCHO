const express = require('express');
const TipoController = require('../controllers/tipo.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Todas as rotas são protegidas
router.use(authMiddleware);

router.get('/', TipoController.index);
router.get('/:id', TipoController.show);
router.post('/', TipoController.store);
router.put('/:id', TipoController.update);
router.delete('/:id', TipoController.destroy);

module.exports = router;

