const pool = require('./../utils/bd');
const TABLA_CATEGORIA = 'categoria';

const allCategory = async () => {
  try {
    const query = 'SELECT * FROM ??';
    const params = [TABLA_CATEGORIA];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const singleCategory = async (id) => {
  try {
    const query = 'SELECT * FROM ?? WHERE id = ?';
    const params = [TABLA_CATEGORIA, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const createCategory = async (obj) => {
  try {
    const query = 'INSERT INTO ?? SET ?';
    const params = [TABLA_CATEGORIA, obj];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (id) => {
  try {
    const query = 'DELETE FROM ?? WHERE id = ?';
    const params = [TABLA_CATEGORIA, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const editCategory = async (id, obj) => {
  try {
    const query = 'UPDATE ?? SET ? WHERE id = ?';
    const params = [TABLA_CATEGORIA, obj, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  allCategory,
  createCategory,
  deleteCategory,
  editCategory,
  singleCategory,
};
