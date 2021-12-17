const express = require('express');
const pool = require('../utils/bd');
const {
  datosPresupuestos,
  datosCliente,
  model_presupuestoPorId,
} = require('../models/busqueda');
const router = express.Router();

const index = (req, res) => {
  res.render('./busqueda/busqueda.hbs');
};

const descargarPDF = (req, res) => {
  let { presupuestoNro } = req.body;
  res.download(
    `./invoice/Presupuesto_Nro._${presupuestoNro}.pdf`,
    function (error) {
      if (error) {
        req.flash('danger_msg', 'NÚMERO DE PRESUPUESTO INEXISTENTE');
        res.redirect('/busqueda');
      }
    }
  );
};

const presupuestosPorCliente = async (req, res) => {
  try {
    const { id_cliente } = req.body;
    const presupuestos = await datosPresupuestos(id_cliente);
    const cliente = await datosCliente(id_cliente);
    res.render('./busqueda/busqueda', { cliente, presupuestos });
  } catch (error) {
    throw error;
  }
};

const presupuestoPorId = async (req, res) => {
  try {
    const { id_presupuesto } = req.body;
    const detallePresupuesto = await model_presupuestoPorId(id_presupuesto);
    res.render('./busqueda/busqueda', { detallePresupuesto, id_presupuesto });
  } catch (error) {
    throw error;
  }
};

router.get('/', index);
router.post('/download', descargarPDF);
router.post('/busqueda_cliente', presupuestosPorCliente);
router.post('/busqueda_cliente/modal', presupuestoPorId);

module.exports = router;
