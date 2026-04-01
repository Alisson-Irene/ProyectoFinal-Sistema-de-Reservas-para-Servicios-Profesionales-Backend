const db = require('../config/db');

// CREAR HORARIO
const crearHorario = async (req, res) => {
    try {
        const { profesional_id, fecha, hora } = req.body;

        if (!profesional_id || !fecha || !hora) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios'
            });
        }

        const result = await db.query(
            `INSERT INTO horarios (profesional_id, fecha, hora, disponible)
             VALUES ($1, $2, $3, true)
             RETURNING *`,
            [profesional_id, fecha, hora]
        );

        res.status(201).json({
            message: 'Horario creado correctamente',
            horario: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear horario'
        });
    }
};

// LISTAR HORARIOS DISPONIBLES
const listarHorarios = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM horarios WHERE disponible = true ORDER BY fecha, hora'
        );

        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al listar horarios'
        });
    }
};

module.exports = {
    crearHorario,
    listarHorarios
};