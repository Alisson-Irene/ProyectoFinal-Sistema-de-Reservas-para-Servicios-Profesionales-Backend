const express = require('express');
const router = express.Router();

const {
  obtenerServicios,
  obtenerServiciosActivos,
  crearServicio,
  actualizarServicio,
  eliminarServicio
} = require('../controllers/servicio_controller');

router.get('/', obtenerServicios);
router.get('/activos', obtenerServiciosActivos);
router.post('/', crearServicio);
router.put('/:id', actualizarServicio);
router.delete('/:id', eliminarServicio);

module.exports = router;