const pool = require('../config/db');

const obtenerCategorias = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorias ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('ERROR CATEGORIAS:', error);
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
};

module.exports = { obtenerCategorias };