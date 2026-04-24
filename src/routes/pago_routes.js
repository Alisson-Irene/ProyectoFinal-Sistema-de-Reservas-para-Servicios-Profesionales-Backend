const express = require('express');
const router = express.Router();

const { obtenerPagos } = require('../controllers/pago_controller');

router.get('/', obtenerPagos);

module.exports = router;