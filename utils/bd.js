const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool ({
    host: process.env.BD_HOST || 'localhost',
    port: process.env.BD_PORT || 3306,
    password : process.env.BD_PASSWORD || '',
    user : process.env.BD_USER || 'root',
    database : process.env.BD_NAME || 'presupuestos',
    connectionLimit : 10,
});

pool.query = util.promisify(pool.query);
module.exports = pool;
