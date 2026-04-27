const express = require('express');
const router = express.Router();

const {
  obtenerFormasPago,
  obtenerFormasPagoActivas,
  crearFormaPago,
  actualizarFormaPago,
  eliminarFormaPago
} = require('../controllers/forma_pago_controller');

router.get('/', obtenerFormasPago);
router.get('/activas', obtenerFormasPagoActivas);
router.post('/', crearFormaPago);
router.put('/:id', actualizarFormaPago);
router.delete('/:id', eliminarFormaPago);

module.exports = router;
