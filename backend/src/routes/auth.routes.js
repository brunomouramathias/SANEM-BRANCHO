const express = require('express');
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Rotas públicas
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

// Rotas protegidas
router.post('/logout', authMiddleware, AuthController.logout);
router.get('/verify', authMiddleware, AuthController.verify);

module.exports = router;

