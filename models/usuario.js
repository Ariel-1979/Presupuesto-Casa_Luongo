const pool = require('./../utils/bd');
const TABLA_USUARIOS = 'usuarios';

const allUsers = async () => {
  try {
    const query = 'SELECT * FROM ??';
    const params = [TABLA_USUARIOS];
    const rows = await pool.query(query, params);
    console.log(`allUSER ROWS - ${rows}`);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (obj) => {
  try {
    const query = 'INSERT INTO ?? SET ?';
    const params = [TABLA_USUARIOS, obj];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const singleUser = async (id) => {
  try {
    const query = 'SELECT * FROM  ?? WHERE id = ?';
    const params = [TABLA_USUARIOS, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (id, obj) => {
  try {
    const query = 'UPDATE ?? SET ? WHERE id = ?';
    const params = [TABLA_USUARIOS, obj, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    const query = 'DELETE FROM ?? WHERE id = ?';
    const params = [TABLA_USUARIOS, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const auth = async ({ user, password }) => {
  try {
    const query = 'SELECT id, nivel FROM ?? WHERE user = ? AND password = ?';
    const params = [TABLA_USUARIOS, user, password];
    const rows = await pool.query(query, params);
    return rows;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  allUsers,
  createUser,
  singleUser,
  editUser,
  deleteUser,
  auth,
};
