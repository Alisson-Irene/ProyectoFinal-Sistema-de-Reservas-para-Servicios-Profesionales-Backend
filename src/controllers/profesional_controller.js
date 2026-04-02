const db = require('../config/db');

const crearProfesional = async (req, res) => {
    try {
        const { nombre, especialidad, telefono } = req.body;

        if (!nombre) {
            return res.status(400).json({
                message: 'El nombre es obligatorio'
            });
        }

        const result = await db.query(
            `INSERT INTO profesionales (nombre, especialidad, telefono)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nombre, especialidad, telefono]
        );

        res.status(201).json({
            message: 'Profesional creado correctamente',
            profesional: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear profesional'
        });
    }
};

const listarProfesionales = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM profesionales ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al listar profesionales'
        });
    }
};

module.exports = {
    crearProfesional,
    listarProfesionales
};