const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const conn = process.env.DBConnLink;

if (!conn) {
    throw new Error('DATABASE_URL environment variable is not defined');
  }

const itemsPool = new Pool({
    connectionString: conn,
    ssl: process.env.DBConnLink ? {
        rejectUnauthorized: false
    } : false
});
module.exports = itemsPool;
