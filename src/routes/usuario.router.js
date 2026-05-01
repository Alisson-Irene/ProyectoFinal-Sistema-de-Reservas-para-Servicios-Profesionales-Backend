const express = require('express');
const router = express.Router();
const { verificarToken, autorizarRoles } = require('../middlewares/auth.middleware');

const {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  cambiarPassword
} = require('../controllers/usuario.controller');

router.put('/cambiar-password', cambiarPassword); // 🔥 AQUÍ

router.use(verificarToken, autorizarRoles('admin'));

router.get('/', obtenerUsuarios);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;
