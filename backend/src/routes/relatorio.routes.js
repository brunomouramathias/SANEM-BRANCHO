const express = require('express');
const RelatorioController = require('../controllers/relatorio.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Todas as rotas são protegidas
router.use(authMiddleware);

router.get('/dashboard', RelatorioController.dashboard);
router.get('/periodo', RelatorioController.doacoesPorPeriodo);
router.get('/beneficiario/:beneficiarioId', RelatorioController.porBeneficiario);
router.get('/mensal', RelatorioController.distribuicaoMensal);

module.exports = router;

