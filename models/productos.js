const { PayloadTooLarge } = require('http-errors');
const pool = require('./../utils/bd');
const TABLA_PRODUCTOS = 'productos';

const allProducts = async () => {
  try {
    const query = 'SELECT * FROM ??';
    const params = [TABLA_PRODUCTOS];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const singleProduct = async (id) => {
  try {
    const query = 'SELECT * FROM ?? WHERE id = ?';
    const params = [TABLA_PRODUCTOS, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (obj) => {
  try {
    const query = 'INSERT INTO ?? SET ?';
    const params = [TABLA_PRODUCTOS, obj];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const editProduct = async (id, obj) => {
  try {
    const query = 'UPDATE ?? SET ? WHERE id = ?';
    const params = [TABLA_PRODUCTOS, obj, id];
    const rows = await pool.query(query, params);
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const dropProduct = async (id) => {
  try {
    const query = 'DELETE FROM ?? WHERE id_insumos = ?';
    const params = [TABLA_INSUMOS, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { allProducts, singleProduct, createProduct, editProduct };
