const express = require('express');
const router = express.Router();
const { registrar, login, verificarSesion } = require('../controllers/auth.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.post('/register', registrar);
router.post('/login', login);
router.get('/verificar', verificarToken, verificarSesion);

module.exports = router;
