const { Pool } = require('pg');
const fs = require('fs');

let configSettings = null;

const configFile = `${__dirname}/../conf.json`;

try {
    const data = fs.readFileSync(configFile, 'utf8');
    configSettings = JSON.parse(data);
    console.debug("Using database password from conf.json");
} catch (error) {
    console.error(`Failed to grab configuration settings: ${e}`);
}

const pool = new Pool({
  user: configSettings.DATABASE.username,
  password: configSettings.DATABASE.password,
  host: configSettings.DATABASE.host,
  port: configSettings.DATABASE.port,
  database: configSettings.DATABASE.dbName
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};