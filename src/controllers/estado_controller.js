const pool = require('../config/db');

const obtenerEstados = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estados_reserva ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('ERROR ESTADOS:', error);
    res.status(500).json({ message: 'Error al obtener estados de reserva' });
  }
};

module.exports = { obtenerEstados };