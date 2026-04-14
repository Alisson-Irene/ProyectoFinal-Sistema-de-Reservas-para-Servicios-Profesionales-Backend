const pool = require('../config/db');

const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios' });
    }

    const result = await pool.query(
      'SELECT id, nombre, correo, rol FROM usuarios WHERE correo = $1 AND password = $2',
      [correo, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const usuario = result.rows[0];

    res.json({
      mensaje: 'Inicio de sesión correcto',
      usuario
    });
  } catch (error) {
    console.error('ERROR LOGIN:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { login };