const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const itemsPool = new Pool({
    connectionString: process.env.DBConnLink,
    ssl: process.env.DBConnLink ? {
        rejectUnauthorized: false
    } : false
});
module.exports = itemsPool;
