const express = require('express');
const router = express.Router();

const {
  obtenerServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio
} = require('../controllers/servicio_controller');


router.get('/', obtenerServicios);
router.post('/', crearServicio);
router.put('/:id', actualizarServicio);
router.delete('/:id', eliminarServicio);

module.exports = router;