const pool = require('./../utils/bd');
const TABLA_PROVEEDOR = 'proveedores';

const allVendors = async () => {
  try {
    const query = 'SELECT * FROM ??';
    const params = [TABLA_PROVEEDOR];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const createVendor = async (obj) => {
  try {
    const query = 'INSERT INTO ?? SET ?';
    const params = [TABLA_PROVEEDOR, obj];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const singleVendor = async (id) => {
  try {
    const query = 'SELECT * FROM  ?? WHERE id = ?';
    const params = [TABLA_PROVEEDOR, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const editVendor = async (id, obj) => {
  try {
    const query = 'UPDATE ?? SET ? WHERE id = ?';
    const params = [TABLA_PROVEEDOR, obj, id];
    const rows = await pool.query(query, params);
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const deleteVendor = async (id) => {
  try {
    const query = 'DELETE FROM ?? WHERE id = ?';
    const params = [TABLA_PROVEEDOR, id];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  allVendors,
  singleVendor,
  createVendor,
  editVendor,
  deleteVendor,
};
