const pool = require('../config/db');

const obtenerFormasPago = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, descripcion, estado FROM formas_pago ORDER BY id ASC'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('ERROR FORMAS DE PAGO:', error);
    res.status(500).json({
      message: 'Error al obtener formas de pago',
      detalle: error.message
    });
  }
};

const obtenerFormasPagoActivas = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, nombre, descripcion, estado
       FROM formas_pago
       WHERE estado = 'ACTIVO'
       ORDER BY id ASC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('ERROR FORMAS DE PAGO ACTIVAS:', error);
    res.status(500).json({
      message: 'Error al obtener formas de pago activas',
      detalle: error.message
    });
  }
};

const crearFormaPago = async (req, res) => {
  try {
    const { nombre, descripcion, estado } = req.body;

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({
        message: 'El nombre de la forma de pago es obligatorio'
      });
    }

    const result = await pool.query(
      `INSERT INTO formas_pago (nombre, descripcion, estado)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nombre.trim(), descripcion ? descripcion.trim() : '', estado || 'ACTIVO']
    );

    res.status(201).json({
      message: 'Forma de pago creada correctamente',
      formaPago: result.rows[0]
    });
  } catch (error) {
    console.error('ERROR CREAR FORMA DE PAGO:', error);
    res.status(500).json({
      message: 'Error al crear forma de pago',
      detalle: error.message
    });
  }
};

const actualizarFormaPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, estado } = req.body;

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({
        message: 'El nombre de la forma de pago es obligatorio'
      });
    }

    const result = await pool.query(
      `UPDATE formas_pago
       SET nombre = $1,
           descripcion = $2,
           estado = $3
       WHERE id = $4
       RETURNING *`,
      [nombre.trim(), descripcion ? descripcion.trim() : '', estado || 'ACTIVO', id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Forma de pago no encontrada'
      });
    }

    res.json({
      message: 'Forma de pago actualizada correctamente',
      formaPago: result.rows[0]
    });
  } catch (error) {
    console.error('ERROR ACTUALIZAR FORMA DE PAGO:', error);
    res.status(500).json({
      message: 'Error al actualizar forma de pago',
      detalle: error.message
    });
  }
};

const eliminarFormaPago = async (req, res) => {
  try {
    const { id } = req.params;

    const usada = await pool.query(
      'SELECT id FROM reservas WHERE forma_pago_id = $1 LIMIT 1',
      [id]
    );

    if (usada.rows.length > 0) {
      return res.status(400).json({
        message: 'No se puede eliminar una forma de pago usada en reservas'
      });
    }

    const result = await pool.query(
      'DELETE FROM formas_pago WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Forma de pago no encontrada'
      });
    }

    res.json({
      message: 'Forma de pago eliminada correctamente'
    });
  } catch (error) {
    console.error('ERROR ELIMINAR FORMA DE PAGO:', error);
    res.status(500).json({
      message: 'Error al eliminar forma de pago',
      detalle: error.message
    });
  }
};

module.exports = {
  obtenerFormasPago,
  obtenerFormasPagoActivas,
  crearFormaPago,
  actualizarFormaPago,
  eliminarFormaPago
};
