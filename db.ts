import { Pool } from 'pg';
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Only required if connecting to a database with SSL/TLS enabled
  }
});

export default pool;
