const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'reservas_db16',
    password: '251004',
    port: 5432,
});

module.exports = pool;
