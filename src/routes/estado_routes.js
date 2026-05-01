const express = require('express');
const router = express.Router();

const { obtenerEstados } = require('../controllers/estado_controller');
const { verificarToken, autorizarRoles } = require('../middlewares/auth.middleware');

router.get('/', verificarToken, autorizarRoles('admin'), obtenerEstados);

module.exports = router;
