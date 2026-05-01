const express = require('express');
const router = express.Router();

const { obtenerPagos } = require('../controllers/pago_controller');
const { verificarToken, autorizarRoles } = require('../middlewares/auth.middleware');

router.get('/', verificarToken, autorizarRoles('admin'), obtenerPagos);

module.exports = router;
