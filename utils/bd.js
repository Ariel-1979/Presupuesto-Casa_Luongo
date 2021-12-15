const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  host: process.env.BD_HOST,
  port: process.env.BD_PORT,
  password: process.env.BD_PASSWORD,
  user: process.env.BD_USER,
  database: process.env.BD_NAME,
  connectionLimit: 10,
});

pool.query = util.promisify(pool.query);
module.exports = pool;
