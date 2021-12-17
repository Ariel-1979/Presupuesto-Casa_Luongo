const pool = require('./../utils/bd');
const TABLA_PRESUPUESTO = 'presupuesto';
const TABLA_CLIENTE = 'clientes';
const TABLA_PEDIDO = 'pedido';

const datosPresupuestos = async (id_cliente) => {
  try {
    const query =
      "SELECT id_presupuesto, DATE_FORMAT(ts_create,'%d/%m/%Y')ts_create  FROM ?? WHERE id_cliente = ?";
    const params = [TABLA_PRESUPUESTO, id_cliente];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};
const datosCliente = async (id_cliente) => {
  try {
    const query =
      'SELECT razon_social, nombre, apellido, direccion, telefono FROM ?? WHERE id = ?';
    const params = [TABLA_CLIENTE, id_cliente];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};
const model_presupuestoPorId = async (id_presupuesto) => {
  try {
    const query =
      'SELECT * FROM ?? WHERE id = ?';
    const params = [TABLA_PEDIDO, id_presupuesto];
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = { datosPresupuestos, datosCliente, model_presupuestoPorId };
