const db = require('../config/db');

const crearReserva = async (req, res) => {
    try {
        const { usuario_id, servicio_id, profesional_id, fecha, hora } = req.body;

        if (!usuario_id || !servicio_id || !profesional_id || !fecha || !hora) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios'
            });
        }

        const horario = await db.query(
            `SELECT * FROM horarios
             WHERE profesional_id = $1 AND fecha = $2 AND hora = $3 AND disponible = true`,
            [profesional_id, fecha, hora]
        );

        if (horario.rows.length === 0) {
            return res.status(400).json({
                message: 'Horario no disponible'
            });
        }

        const result = await db.query(
            `INSERT INTO reservas (usuario_id, servicio_id, profesional_id, fecha, hora, estado)
             VALUES ($1, $2, $3, $4, $5, 'ACTIVA')
             RETURNING *`,
            [usuario_id, servicio_id, profesional_id, fecha, hora]
        );

        await db.query(
            `UPDATE horarios
             SET disponible = false
             WHERE profesional_id = $1 AND fecha = $2 AND hora = $3`,
            [profesional_id, fecha, hora]
        );

        res.status(201).json({
            message: 'Reserva creada correctamente',
            reserva: result.rows[0]
        });
    } catch (error) {
    console.error('ERROR REAL RESERVA:', error);

    res.status(500).json({
        message: 'Error al crear reserva',
        error: error.message,
        detail: error.detail || null
    });


    }
};

const listarReservas = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM reservas ORDER BY id DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al listar reservas'
        });
    }
};

module.exports = {
    crearReserva,
    listarReservas
};