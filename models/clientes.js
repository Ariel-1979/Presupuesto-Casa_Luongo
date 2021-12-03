const pool = require('./../utils/bd');
const TABLA_CLIENTES = 'clientes';

const allCustomers = async () => {
  try {
    const query = 'SELECT * FROM ??';
    const params = [TABLA_CLIENTES];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const createCustomer = async (obj) => {
  try {
    const query = 'INSERT INTO ?? SET ?';
    const params = [TABLA_CLIENTES, obj];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const singleCustomer = async (id) => {
  try {
    const query = 'SELECT * FROM  ?? WHERE id = ?';
    const params = [TABLA_CLIENTES, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const editCustomer = async (id, obj) => {
  try {
    const query = 'UPDATE ?? SET ? WHERE id = ?';
    const params = [TABLA_CLIENTES, obj, id];
    const rows = await pool.query(query, params);
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const dropCustomer = async (id) => {
  try {
    const query = 'DELETE FROM ?? WHERE id = ?';
    const params = [TABLA_CLIENTES, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  allCustomers,
  createCustomer,
  singleCustomer,
  editCustomer,
  dropCustomer,
};
