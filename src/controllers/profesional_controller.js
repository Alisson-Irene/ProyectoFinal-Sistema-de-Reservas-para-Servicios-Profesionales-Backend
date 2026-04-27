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

const actualizarProfesional = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, especialidad, telefono } = req.body;

        if (!nombre) {
            return res.status(400).json({
                message: 'El nombre es obligatorio'
            });
        }

        const result = await db.query(
            `UPDATE profesionales
             SET nombre = $1,
                 especialidad = $2,
                 telefono = $3
             WHERE id = $4
             RETURNING *`,
            [nombre, especialidad, telefono, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Profesional no encontrado'
            });
        }

        res.json({
            message: 'Profesional actualizado correctamente',
            profesional: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al actualizar profesional',
            detalle: error.message
        });
    }
};

const eliminarProfesional = async (req, res) => {
    try {
        const { id } = req.params;

        const usado = await db.query(
            'SELECT id FROM reservas WHERE profesional_id = $1 LIMIT 1',
            [id]
        );

        if (usado.rows.length > 0) {
            return res.status(400).json({
                message: 'No se puede eliminar un profesional con reservas registradas'
            });
        }

        const result = await db.query(
            'DELETE FROM profesionales WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Profesional no encontrado'
            });
        }

        res.json({
            message: 'Profesional eliminado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al eliminar profesional',
            detalle: error.message
        });
    }
};

module.exports = {
    crearProfesional,
    listarProfesionales,
    actualizarProfesional,
    eliminarProfesional
};
