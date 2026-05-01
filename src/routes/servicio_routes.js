const express = require('express');
const router = express.Router();
const { verificarToken, autorizarRoles } = require('../middlewares/auth.middleware');

const {
  obtenerServicios,
  obtenerServiciosActivos,
  crearServicio,
  actualizarServicio,
  eliminarServicio
} = require('../controllers/servicio_controller');

router.get('/activos', verificarToken, autorizarRoles('admin', 'usuario'), obtenerServiciosActivos);
router.get('/', verificarToken, autorizarRoles('admin'), obtenerServicios);
router.post('/', verificarToken, autorizarRoles('admin'), crearServicio);
router.put('/:id', verificarToken, autorizarRoles('admin'), actualizarServicio);
router.delete('/:id', verificarToken, autorizarRoles('admin'), eliminarServicio);

module.exports = router;
