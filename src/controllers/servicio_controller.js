const pool = require('../config/db');

// OBTENER SERVICIOS ADMIN
const obtenerServicios = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id,
        s.nombre,
        s.descripcion,
        s.precio,
        s.estado,
        s.imagen_url,
        s.categoria_id,
        c.nombre AS categoria
      FROM servicios s
      LEFT JOIN categorias c ON s.categoria_id = c.id
      ORDER BY s.id ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('ERROR AL OBTENER SERVICIOS:', error);
    res.status(500).json({
      message: 'Error al obtener servicios',
      detalle: error.message
    });
  }
};

// OBTENER SERVICIOS ACTIVOS PARA USUARIO
const obtenerServiciosActivos = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id,
        s.nombre,
        s.descripcion,
        s.precio,
        s.estado,
        s.imagen_url,
        s.categoria_id,
        c.nombre AS categoria
      FROM servicios s
      LEFT JOIN categorias c ON s.categoria_id = c.id
      WHERE s.estado = 'ACTIVO'
      ORDER BY s.id ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('ERROR SERVICIOS ACTIVOS:', error);
    res.status(500).json({
      message: 'Error al obtener servicios activos',
      detalle: error.message
    });
  }
};

// CREAR SERVICIO
const crearServicio = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria_id, estado, imagen_url } = req.body;

    if (!nombre || !descripcion || precio === null || precio === undefined || precio === '') {
      return res.status(400).json({
        message: 'Nombre, descripción y precio son obligatorios'
      });
    }

    const categoriaFinal = categoria_id ? Number(categoria_id) : null;
    const estadoFinal = estado || 'ACTIVO';

    const result = await pool.query(
      `INSERT INTO servicios 
       (nombre, descripcion, precio, categoria_id, estado, imagen_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [nombre, descripcion, precio, categoriaFinal, estadoFinal, imagen_url || null]
    );

    res.status(201).json({
      message: 'Servicio creado correctamente',
      servicio: result.rows[0]
    });

  } catch (error) {
    console.error('ERROR AL CREAR SERVICIO:', error);
    res.status(500).json({
      message: 'Error al crear servicio',
      detalle: error.message
    });
  }
};

// ACTUALIZAR SERVICIO
const actualizarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria_id, estado, imagen_url } = req.body;

    if (!nombre || !descripcion || precio === null || precio === undefined || precio === '') {
      return res.status(400).json({
        message: 'Nombre, descripción y precio son obligatorios'
      });
    }

    const categoriaFinal = categoria_id ? Number(categoria_id) : null;
    const estadoFinal = estado || 'ACTIVO';

    const result = await pool.query(
      `UPDATE servicios 
       SET nombre = $1,
           descripcion = $2,
           precio = $3,
           categoria_id = $4,
           estado = $5,
           imagen_url = $6
       WHERE id = $7
       RETURNING *`,
      [nombre, descripcion, precio, categoriaFinal, estadoFinal, imagen_url || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Servicio no encontrado'
      });
    }

    res.json({
      message: 'Servicio actualizado correctamente',
      servicio: result.rows[0]
    });

  } catch (error) {
    console.error('ERROR AL ACTUALIZAR SERVICIO:', error);
    res.status(500).json({
      message: 'Error al actualizar servicio',
      detalle: error.message
    });
  }
};

// ELIMINAR SERVICIO
const eliminarServicio = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM servicios WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Servicio no encontrado'
      });
    }

    res.json({
      message: 'Servicio eliminado correctamente'
    });

  } catch (error) {
    console.error('ERROR AL ELIMINAR SERVICIO:', error);
    res.status(500).json({
      message: 'Error al eliminar servicio',
      detalle: error.message
    });
  }
};

module.exports = {
  obtenerServicios,
  obtenerServiciosActivos,
  crearServicio,
  actualizarServicio,
  eliminarServicio
};
