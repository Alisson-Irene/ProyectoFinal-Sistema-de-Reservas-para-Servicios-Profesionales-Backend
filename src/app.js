require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const profesionalRoutes = require('./routes/profesional_routes');
const horarioRoutes = require('./routes/horario_routes');
const reservaRoutes = require('./routes/reserva_routes');
const servicioRoutes = require('./routes/servicio_routes');
const usuarioRoutes = require('./routes/usuario.router');
const categoriaRoutes = require('./routes/categoria_routes');
const formaPagoRoutes = require('./routes/forma_pago_routes');
const { verificarToken, autorizarRoles } = require('./middlewares/auth.middleware');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// RUTAS
app.use('/api/auth', authRoutes);
app.use('/api/profesionales', profesionalRoutes);
app.use('/api/horarios', horarioRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/formas-pago', formaPagoRoutes);

// PRUEBA DE CONEXIÓN
app.get('/api/db-test', async (req, res) => {
  try {
    const dbName = await db.query('SELECT current_database() AS database');
    const schemaName = await db.query('SHOW search_path');

    const tablas = await db.query(`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_name IN ('categorias', 'estados_reserva', 'formas_pago', 'pagos')
      ORDER BY table_name
    `);

    res.json({
      database: dbName.rows[0].database,
      search_path: schemaName.rows[0].search_path,
      tablas: tablas.rows
    });
  } catch (error) {
    console.error('ERROR DB TEST:', error);
    res.status(500).json({ 
      message: 'Error al probar conexión',
      detalle: error.message 
    });
  }
});

// ESTADOS DE RESERVA
app.get('/api/estados', verificarToken, autorizarRoles('admin'), async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, nombre FROM public.estados_reserva ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('ERROR ESTADOS:', error);
    res.status(500).json({
      message: 'Error al obtener estados',
      detalle: error.message
    });
  }
});

// PAGOS
app.get('/api/pagos', verificarToken, autorizarRoles('admin'), async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, reserva_id, monto, fecha_pago FROM public.pagos ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('ERROR PAGOS:', error);
    res.status(500).json({
      message: 'Error al obtener pagos',
      detalle: error.message
    });
  }
});

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

db.connect()
  .then(() => console.log('Base de datos conectada'))
  .catch(err => console.error('Error de conexión', err));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
