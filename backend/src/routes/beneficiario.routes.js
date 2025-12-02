const express = require('express');
const BeneficiarioController = require('../controllers/beneficiario.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Todas as rotas são protegidas
router.use(authMiddleware);

router.get('/', BeneficiarioController.index);
router.get('/:id', BeneficiarioController.show);
router.post('/', BeneficiarioController.store);
router.put('/:id', BeneficiarioController.update);
router.delete('/:id', BeneficiarioController.destroy);

module.exports = router;

