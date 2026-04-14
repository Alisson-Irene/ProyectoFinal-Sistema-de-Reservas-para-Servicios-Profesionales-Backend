const pool = require('../config/db');

const obtenerServicios = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, descripcion, precio FROM servicios ORDER BY id ASC'
    );

   
    res.json(result.rows);

  } catch (error) {
    console.error('ERROR AL OBTENER SERVICIOS:', error);
    res.status(500).json({ message: 'Error al obtener servicios' });
  }
};

// CREAR
const crearServicio = async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;

    if (!nombre || !descripcion || precio === null || precio === undefined) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const result = await pool.query(
      'INSERT INTO servicios (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *',
      [nombre, descripcion, precio]
    );

    res.status(201).json({
      message: 'Servicio creado correctamente',
      servicio: result.rows[0]
    });

  } catch (error) {
    console.error('ERROR AL CREAR SERVICIO:', error);
    res.status(500).json({ message: 'Error al crear servicio' });
  }
};

// ACTUALIZAR
const actualizarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;

    const result = await pool.query(
      'UPDATE servicios SET nombre = $1, descripcion = $2, precio = $3 WHERE id = $4 RETURNING *',
      [nombre, descripcion, precio, id]
    );

    res.json({
      message: 'Servicio actualizado correctamente',
      servicio: result.rows[0]
    });

  } catch (error) {
    console.error('ERROR AL ACTUALIZAR SERVICIO:', error);
    res.status(500).json({ message: 'Error al actualizar servicio' });
  }
};

// ELIMINAR
const eliminarServicio = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM servicios WHERE id = $1', [id]);

    res.json({ message: 'Servicio eliminado correctamente' });

  } catch (error) {
    console.error('ERROR AL ELIMINAR SERVICIO:', error);
    res.status(500).json({ message: 'Error al eliminar servicio' });
  }
};

module.exports = {
  obtenerServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio
};