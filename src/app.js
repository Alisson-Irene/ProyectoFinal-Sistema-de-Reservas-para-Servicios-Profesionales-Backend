require('dotenv').config({ quiet: true });

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
const PORT = process.env.PORT || 3000;

// URLs permitidas del frontend
const frontendUrls = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean);

// Configuración de CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || frontendUrls.length === 0 || frontendUrls.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origen no permitido por CORS'));
  },
  credentials: true
}));

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
      WHERE table_name IN (
        'usuarios',
        'categorias',
        'servicios',
        'profesionales',
        'horarios',
        'reservas',
        'estados_reserva',
        'formas_pago',
        'pagos'
      )
      ORDER BY table_name
    `);

    res.json({
      message: 'Conexión a base de datos correcta',
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

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Prueba inicial de conexión a PostgreSQL
db.query('SELECT 1')
  .then(() => console.log('Base de datos conectada'))
  .catch(err => console.error('Error de conexión', err));

// Servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});