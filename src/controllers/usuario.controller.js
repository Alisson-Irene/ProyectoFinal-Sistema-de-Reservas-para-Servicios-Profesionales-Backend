const pool = require('../config/db');

const obtenerUsuarios = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, correo, rol FROM usuarios ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('ERROR AL OBTENER USUARIOS:', error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    console.log('DATOS RECIBIDOS EN REGISTER:', req.body);

    if (!nombre || !correo || !password) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const existe = await pool.query(
      'SELECT * FROM usuarios WHERE correo = $1',
      [correo]
    );

    if (existe.rows.length > 0) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const result = await pool.query(
      'INSERT INTO usuarios (nombre, correo, password, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, correo, rol',
      [nombre, correo, password, rol || 'usuario']
    );

    console.log('USUARIO INSERTADO:', result.rows[0]);

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      usuario: result.rows[0]
    });
  } catch (error) {
    console.error('ERROR AL REGISTRAR USUARIO:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, password, rol } = req.body;

    await pool.query(
      'UPDATE usuarios SET nombre = $1, correo = $2, password = $3, rol = $4 WHERE id = $5',
      [nombre, correo, password, rol, id]
    );

    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('ERROR AL ACTUALIZAR USUARIO:', error);
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('ERROR AL ELIMINAR USUARIO:', error);
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
};

module.exports = {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};