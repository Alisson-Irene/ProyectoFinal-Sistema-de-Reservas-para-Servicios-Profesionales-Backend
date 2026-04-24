const pool = require('../config/db');

const obtenerPagos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pagos ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('ERROR PAGOS:', error);
    res.status(500).json({ message: 'Error al obtener pagos' });
  }
};

module.exports = { obtenerPagos };