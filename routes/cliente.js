const express = require('express');
const model = require('../models/clientes');
const router = express.Router();

const createCustomer = async (req, res) => {
  try {
    const newCustomer = req.body;
    await model.createCustomer(newCustomer);
    req.flash('success_msg', 'CLIENTE CREADO CON ÉXITO');
    res.redirect('/cliente');
  } catch (error) {
    req.flash('danger_msg', 'ERROR AL REGISTRAR EL CLIENTE');
    res.redirect('/cliente');
  }
};

const customers = async (req, res) => {
  try {
    const allCustomers = await model.allCustomers();
    res.render('./clientes/allCustomers', {
      allCustomers,
    });
  } catch (error) {
    req.flash('danger_msg', 'ERROR AL CARGAR LOS DATOS');
    res.redirect('/cliente');
  }
};

const singleCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await model.singleCustomer(id);
    res.render('./clientes/singleCustomer', {
      customer,
    });
  } catch (error) {
    req.flash('danger_msg', 'ERROR AL CARGAR LOS DATOS');
    res.redirect('/cliente');
  }
};

const editCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    await model.editCustomer(id, obj);
    req.flash('success_msg', 'CLIENTE EDITADO CON ÉXITO');
    res.redirect('/cliente');
  } catch (error) {
    req.flash('danger_msg', 'ERROR AL EDITAR AL CLIENTE');
    res.redirect('/cliente');
  }
};

const dropCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    await model.dropCustomer(id);
    req.flash('success_msg', 'CLIENTE BORRADO CON ÉXITO');
    res.redirect('/cliente');
  } catch (error) {
    req.flash('danger_msg', 'ERROR AL BORRAR AL CLIENTE');
    res.redirect('/cliente');
  }
};

router.get('/', customers);
router.get('/single/:id', singleCustomer);
router.post('/create', createCustomer);
router.post('/editar/:id', editCustomer);
router.post('/drop/:id', dropCustomer);

module.exports = router;
