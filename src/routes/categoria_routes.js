const express = require('express');
const router = express.Router();
const { verificarToken, autorizarRoles } = require('../middlewares/auth.middleware');

const {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} = require('../controllers/categoria_controller');

// 🔹 USUARIO (solo ver)
router.get('/', verificarToken, autorizarRoles('admin', 'usuario'), obtenerCategorias);

// 🔹 ADMIN (CRUD completo)
router.post('/', verificarToken, autorizarRoles('admin'), crearCategoria);        // crear
router.put('/:id', verificarToken, autorizarRoles('admin'), actualizarCategoria); // editar
router.delete('/:id', verificarToken, autorizarRoles('admin'), eliminarCategoria); // eliminar

module.exports = router;
