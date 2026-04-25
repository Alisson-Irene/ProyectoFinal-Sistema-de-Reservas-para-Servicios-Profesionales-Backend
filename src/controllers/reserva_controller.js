const db = require('../config/db');

// CREAR RESERVA
const crearReserva = async (req, res) => {
  try {
    const { usuario_id, servicio_id, profesional_id, fecha, hora } = req.body;

    if (!usuario_id || !servicio_id || !profesional_id || !fecha || !hora) {
      return res.status(400).json({
        message: 'Todos los campos son obligatorios'
      });
    }

    // Validar que ese profesional no tenga otra reserva en la misma fecha y hora
    const existeReserva = await db.query(
      `SELECT id FROM reservas
       WHERE profesional_id = $1
       AND fecha = $2
       AND hora = $3`,
      [profesional_id, fecha, hora]
    );

    if (existeReserva.rows.length > 0) {
      return res.status(400).json({
        message: 'Ese profesional ya tiene una reserva en esa fecha y hora'
      });
    }

    const result = await db.query(
      `INSERT INTO reservas 
       (usuario_id, servicio_id, profesional_id, fecha, hora, estado)
       VALUES ($1, $2, $3, $4, $5, 'PENDIENTE')
       RETURNING *`,
      [usuario_id, servicio_id, profesional_id, fecha, hora]
    );

    res.status(201).json({
      message: 'Reserva creada correctamente',
      reserva: result.rows[0]
    });

  } catch (error) {
    console.error('ERROR CREAR RESERVA:', error);
    res.status(500).json({
      message: 'Error al crear reserva',
      detalle: error.message
    });
  }
};

// LISTAR RESERVAS
const listarReservas = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        r.id,
        r.usuario_id,
        COALESCE(u.nombre, 'Usuario no encontrado') AS usuario,
        r.servicio_id,
        COALESCE(s.nombre, 'Servicio no encontrado') AS servicio,
        s.precio,
        r.profesional_id,
        COALESCE(p.nombre, 'Profesional no encontrado') AS profesional,
        r.fecha,
        r.hora,
        r.estado
      FROM reservas r
      LEFT JOIN usuarios u ON r.usuario_id = u.id
      LEFT JOIN servicios s ON r.servicio_id = s.id
      LEFT JOIN profesionales p ON r.profesional_id = p.id
      ORDER BY r.id DESC
    `);

    res.status(200).json(result.rows);

  } catch (error) {
    console.error('ERROR LISTAR RESERVAS:', error);
    res.status(500).json({
      message: 'Error al listar reservas',
      detalle: error.message
    });
  }
};

module.exports = {
  crearReserva,
  listarReservas
};