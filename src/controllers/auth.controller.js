const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const { compararPassword, esHashBcrypt, hashPassword } = require('../utils/password');

const JWT_SECRET = process.env.JWT_SECRET || 'reservas_jwt_secret_dev';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';

const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

const registrar = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ mensaje: 'Nombre, correo y contraseña son obligatorios' });
    }

    const existe = await pool.query(
      'SELECT id FROM usuarios WHERE correo = $1',
      [correo]
    );

    if (existe.rows.length > 0) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const passwordHasheada = await hashPassword(password);
    const result = await pool.query(
      `INSERT INTO usuarios (nombre, correo, password, rol)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nombre, correo, rol`,
      [nombre, correo, passwordHasheada, 'usuario']
    );

    const usuario = result.rows[0];
    const token = generarToken(usuario);

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      token,
      usuario
    });
  } catch (error) {
    console.error('ERROR REGISTRO:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios' });
    }

    const result = await pool.query(
      'SELECT id, nombre, correo, password, rol FROM usuarios WHERE correo = $1',
      [correo]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const usuarioDb = result.rows[0];
    const passwordValida = await compararPassword(password, usuarioDb.password);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    if (!esHashBcrypt(usuarioDb.password)) {
      const passwordHasheada = await hashPassword(password);
      await pool.query('UPDATE usuarios SET password = $1 WHERE id = $2', [
        passwordHasheada,
        usuarioDb.id
      ]);
    }

    const usuario = {
      id: usuarioDb.id,
      nombre: usuarioDb.nombre,
      correo: usuarioDb.correo,
      rol: usuarioDb.rol
    };

    const token = generarToken(usuario);

    res.json({
      mensaje: 'Inicio de sesión correcto',
      token,
      usuario
    });
  } catch (error) {
    console.error('ERROR LOGIN:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const verificarSesion = (req, res) => {
  res.json({
    mensaje: 'Token válido',
    usuario: req.usuario
  });
};

module.exports = { registrar, login, verificarSesion };
