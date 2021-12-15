const pool = require('./../utils/bd');
const TABLA_USUARIOS = 'usuarios';

const allUsers = async () => {
  try {
    const query = 'SELECT * FROM ??';
    const params = [TABLA_USUARIOS];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const createUser = async (obj) => {
  try {
    const query = 'INSERT INTO ?? SET ?';
    const params = [TABLA_USUARIOS, obj];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const singleUser = async (id) => {
  try {
    const query = 'SELECT * FROM  ?? WHERE id = ?';
    const params = [TABLA_USUARIOS, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const editUser = async (id, obj) => {
  try {
    const query = 'UPDATE ?? SET ? WHERE id = ?';
    const params = [TABLA_USUARIOS, obj, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const query = 'DELETE FROM ?? WHERE id = ?';
    const params = [TABLA_USUARIOS, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const userAuthentication = async ({ user, password }) => {
  try {
    const query = 'SELECT * FROM ?? WHERE user = ? AND password = ?';
    const params = [TABLA_USUARIOS, user, password];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  allUsers,
  createUser,
  singleUser,
  editUser,
  deleteUser,
  userAuthentication,
};
