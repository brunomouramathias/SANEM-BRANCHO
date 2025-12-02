const express = require('express');
const DoacaoEnviadaController = require('../controllers/doacaoEnviada.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Todas as rotas são protegidas
router.use(authMiddleware);

router.get('/', DoacaoEnviadaController.index);
router.get('/beneficiario/:beneficiarioId', DoacaoEnviadaController.byBeneficiario);
router.get('/:id', DoacaoEnviadaController.show);
router.post('/', DoacaoEnviadaController.store);
router.delete('/:id', DoacaoEnviadaController.destroy);

module.exports = router;

