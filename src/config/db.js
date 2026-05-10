const { Pool } = require('pg');
require('dotenv').config({ quiet: true });

const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (!process.env.DATABASE_URL && missingEnvVars.length > 0) {
  throw new Error(`Faltan variables de entorno para PostgreSQL: ${missingEnvVars.join(', ')}`);
}

const usarSsl =
  process.env.DB_SSL === 'true' ||
  (process.env.DATABASE_URL && process.env.NODE_ENV === 'production');

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: usarSsl ? { rejectUnauthorized: false } : false
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
        ssl: usarSsl ? { rejectUnauthorized: false } : false
      }
);

module.exports = pool;
