const db = require('../config/db');

// REGISTRAR USUARIO
const register = async (req, res) => {
    try {
        const { nombre, correo, password, rol } = req.body;

        const result = await db.query(
            'INSERT INTO usuarios (nombre, correo, password, rol) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, correo, password, rol || 'usuario']
        );

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const result = await db.query(
            'SELECT * FROM usuarios WHERE correo = $1',
            [correo]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        const user = result.rows[0];

        if (user.password !== password) {
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });
        }

        res.status(200).json({
            message: 'Login exitoso',
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al iniciar sesión'
        });
    }
};

module.exports = {
    register,
    login
};