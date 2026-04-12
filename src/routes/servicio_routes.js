const express = require('express');
const router = express.Router();

const {
    crearServicio,
    listarServicios,
    actualizarServicio,
    eliminarServicio
} = require('../controllers/servicio_controller');

router.post('/', crearServicio);
router.get('/', listarServicios);
router.put('/:id', actualizarServicio);
router.delete('/:id', eliminarServicio);

module.exports = router;