const db = require('../config/db');

// CREAR
const crearServicio = async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;

    if (!nombre || !precio) {
      return res.status(400).json({ message: 'Nombre y precio son obligatorios' });
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
    res.status(500).json({ message: 'Error al crear servicio' });
  }
};

// LISTAR
const listarServicios = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM servicios ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al listar servicios' });
  }
};

// ACTUALIZAR
const actualizarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;

    const result = await db.query(
      `UPDATE servicios
       SET nombre = $1, descripcion = $2, precio = $3
       WHERE id = $4
       RETURNING *`,
      [nombre, descripcion, precio, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    res.status(200).json({
      message: 'Servicio actualizado correctamente',
      servicio: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar servicio' });
  }
};

// ELIMINARA
const eliminarServicio = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await db.query(
            'DELETE FROM servicios WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Servicio no encontrado'
            });
        }

        res.status(200).json({
            message: 'Servicio eliminado correctamente',
            servicio: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al eliminar servicio'
        });
    }
};

module.exports = {
  crearServicio,
  listarServicios,
  actualizarServicio,
  eliminarServicio
};