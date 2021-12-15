const pool = require('./../utils/bd');
const TABLA_PRODUCTOS = 'productos';
const TABLA_PRESUPUESTO = 'presupuesto';
const TABLA_PEDIDO = 'pedido';
const TABLA_CLIENTE = 'clientes';

const createBudget = async (id_cliente) => {
  try {
    const query = 'INSERT INTO ?? (id_cliente) VALUE (?)';
    const params = [TABLA_PRESUPUESTO, id_cliente];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const allProducts = async () => {
  try {
    const query = 'SELECT * FROM ??';
    const params = [TABLA_PRODUCTOS];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const singleProduct = async (id) => {
  try {
    const query = 'SELECT * FROM ?? WHERE id = ?';
    const params = [TABLA_PRODUCTOS, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const createOrder = async (obj) => {
  try {
    const query = 'INSERT INTO ?? SET ?';
    const params = [TABLA_PEDIDO, obj];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const addOrder = async (obj, id) => {
  try {
    const query = 'UPDATE ?? SET ? WHERE id = ?';
    const params = [TABLA_PEDIDO, obj, id];
    const rows = await pool.query(query, params);
    console.log(rows);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getOrder = async (id) => {
  try {
    const query = 'SELECT * FROM ?? WHERE id = ?';
    const params = [TABLA_PEDIDO, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const deleteProductOrder = async (pedidos) => {
  try {
    const query = 'DELETE FROM ?? WHERE pedidos = ?';
    const params = [TABLA_PEDIDO, pedidos];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getCustomerID = async (id) => {
  try {
    const query = 'SELECT id_cliente FROM ?? WHERE id_presupuesto = ?';
    const params = [TABLA_PRESUPUESTO, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getCustomerPdf = async (id_cliente) => {
  try {
    const query = 'SELECT * FROM ?? WHERE id = ?';
    const params = [TABLA_CLIENTE, id_cliente];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  allProducts,
  singleProduct,
  createBudget,
  addOrder,
  createOrder,
  getOrder,
  deleteProductOrder,
  getCustomerID,
  getCustomerPdf,
};
