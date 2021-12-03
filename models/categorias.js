const pool = require('./../utils/bd');
const TABLA_CATEGORIA = 'categoria';

const allCategory = async () => {
  try {
    const query = 'SELECT * FROM ??';
    const params = [TABLA_CATEGORIA];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const createCategory = async (obj) => {
  try {
    const query = 'INSERT INTO ?? SET ?';
    const params = [TABLA_CATEGORIA, obj];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (id) => {
  try {
    const query = 'DELETE FROM ?? WHERE id = ?';
    const params = [TABLA_CATEGORIA, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { allCategory, createCategory, deleteCategory };
