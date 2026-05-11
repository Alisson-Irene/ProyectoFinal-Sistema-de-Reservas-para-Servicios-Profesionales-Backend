const express = require('express');
const router = express.Router();
const { verificarToken, autorizarRoles } = require('../middlewares/auth.middleware');

const {
  crearReserva,
  listarReservas,
  actualizarEstadoReserva,
  eliminarReserva
} = require('../controllers/reserva_controller');

router.get('/', verificarToken, autorizarRoles('admin', 'usuario'), listarReservas);
router.post('/', verificarToken, autorizarRoles('admin', 'usuario'), crearReserva);
router.put('/:id/estado', verificarToken, autorizarRoles('admin'), actualizarEstadoReserva);
router.delete('/:id', verificarToken, autorizarRoles('admin'), eliminarReserva);

module.exports = router;
