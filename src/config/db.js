const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'reservas_db14',
    password: 'alisson21',
    port: 5432,
});

module.exports = pool;
