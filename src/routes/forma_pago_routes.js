const express = require('express');
const router = express.Router();
const { verificarToken, autorizarRoles } = require('../middlewares/auth.middleware');

const {
  obtenerFormasPago,
  obtenerFormasPagoActivas,
  crearFormaPago,
  actualizarFormaPago,
  eliminarFormaPago
} = require('../controllers/forma_pago_controller');

router.get('/activas', verificarToken, autorizarRoles('admin', 'usuario'), obtenerFormasPagoActivas);
router.get('/', verificarToken, autorizarRoles('admin'), obtenerFormasPago);
router.post('/', verificarToken, autorizarRoles('admin'), crearFormaPago);
router.put('/:id', verificarToken, autorizarRoles('admin'), actualizarFormaPago);
router.delete('/:id', verificarToken, autorizarRoles('admin'), eliminarFormaPago);

module.exports = router;
