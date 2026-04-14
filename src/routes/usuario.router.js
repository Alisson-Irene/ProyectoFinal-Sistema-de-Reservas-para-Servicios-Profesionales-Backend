const express = require('express');
const router = express.Router();

const {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  cambiarPassword
} = require('../controllers/usuario.controller');

router.get('/', obtenerUsuarios);
router.post('/', crearUsuario);
router.put('/cambiar-password', cambiarPassword); // 🔥 AQUÍ
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;