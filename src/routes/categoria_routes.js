const express = require('express');
const router = express.Router();

const {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} = require('../controllers/categoria_controller');

// 🔹 USUARIO (solo ver)
router.get('/', obtenerCategorias);

// 🔹 ADMIN (CRUD completo)
router.post('/', crearCategoria);        // crear
router.put('/:id', actualizarCategoria); // editar
router.delete('/:id', eliminarCategoria); // eliminar

module.exports = router;