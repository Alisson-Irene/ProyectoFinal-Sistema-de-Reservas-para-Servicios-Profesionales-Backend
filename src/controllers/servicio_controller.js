const db = require('../config/db');

const crearServicio = async (req, res) => {
    try {
        const { nombre, descripcion, precio } = req.body;

        if (!nombre || !precio) {
            return res.status(400).json({
                message: 'Nombre y precio son obligatorios'
            });
        }

        const result = await db.query(
            `INSERT INTO servicios (nombre, descripcion, precio)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nombre, descripcion, precio]
        );

        res.status(201).json({
            message: 'Servicio creado correctamente',
            servicio: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear servicio'
        });
    }
};

const listarServicios = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM servicios ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al listar servicios'
        });
    }
};

module.exports = {
    crearServicio,
    listarServicios
};