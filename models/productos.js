const pool = require('./../utils/bd');
const TABLA_PRODUCTOS = 'productos';

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

const createProduct = async (obj) => {
  try {
    const query = 'INSERT INTO ?? SET ?';
    const params = [TABLA_PRODUCTOS, obj];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const editProduct = async (id, obj) => {
  try {
    const query = 'UPDATE ?? SET ? WHERE id = ?';
    const params = [TABLA_PRODUCTOS, obj, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const query = 'DELETE FROM ?? WHERE id = ?';
    const params = [TABLA_PRODUCTOS, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (e) {
    throw error;
  }
};

module.exports = {
  allProducts,
  singleProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
