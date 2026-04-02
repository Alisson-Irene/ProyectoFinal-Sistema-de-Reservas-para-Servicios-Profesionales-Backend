const express = require('express');
const authRoutes = require('./routes/auth.routes');
const db = require('./config/db');

const cors = require('cors');

const profesionalRoutes = require('./routes/profesional_routes');

const horarioRoutes = require('./routes/horario_routes');

const reservaRoutes = require('./routes/reserva_routes');

const servicioRoutes = require('./routes/servicio_routes'); 

const app = express(); 
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/profesionales', profesionalRoutes);
app.use('/api/horarios', horarioRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/servicios', servicioRoutes); 

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

db.connect()
    .then(() => console.log('Base de datos conectada'))
    .catch(err => console.error('Error de conexión', err));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});