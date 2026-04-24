const express = require('express');
const router = express.Router();

const { obtenerEstados } = require('../controllers/estado_controller');

router.get('/', obtenerEstados);

module.exports = router;