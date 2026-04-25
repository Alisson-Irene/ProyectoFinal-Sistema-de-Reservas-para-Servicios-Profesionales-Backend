const pool = require('../config/db');

// 🔹 OBTENER (USUARIO / ADMIN)
const obtenerCategorias = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre FROM categorias ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('ERROR CATEGORIAS:', error);
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
};

// 🔹 CREAR (ADMIN)
const crearCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    const result = await pool.query(
      'INSERT INTO categorias (nombre) VALUES ($1) RETURNING *',
      [nombre]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('ERROR CREAR CATEGORIA:', error);
    res.status(500).json({ message: 'Error al crear categoría' });
  }
};

// 🔹 ACTUALIZAR (ADMIN)
const actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const result = await pool.query(
      'UPDATE categorias SET nombre = $1 WHERE id = $2 RETURNING *',
      [nombre, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('ERROR ACTUALIZAR CATEGORIA:', error);
    res.status(500).json({ message: 'Error al actualizar categoría' });
  }
};

// 🔹 ELIMINAR (ADMIN)
const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM categorias WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('ERROR ELIMINAR CATEGORIA:', error);
    res.status(500).json({ message: 'Error al eliminar categoría' });
  }
};

module.exports = {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
};