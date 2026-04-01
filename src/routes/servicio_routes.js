const express = require('express');
const router = express.Router();

const {
    crearServicio,
    listarServicios
} = require('../controllers/servicio_controller');

router.post('/', crearServicio);
router.get('/', listarServicios);

module.exports = router;