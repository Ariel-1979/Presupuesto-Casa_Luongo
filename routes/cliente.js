const express = require('express');
const model = require('../models/clientes');
const router = express.Router();

/* GET home page. */
const createCustomer = async (req, res) => {
  try {
    const newCustomer = req.body;
    const addCustomer = await model.createCustomer(newCustomer);
    res.redirect('/cliente');
  } catch (error) {
    console.log(error);
  }
};

const customers = async (req, res) => {
  try {
    const allCustomers = await model.allCustomers();
    res.render('./clientes/allCustomers', {
      allCustomers,
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

const editCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    const customer = await model.editCustomer(id, obj);
    res.redirect('/cliente');
  } catch (error) {
    console.log(error);
  }
};

const dropCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await model.dropCustomer(id);
    res.redirect('/cliente');
  } catch (error) {
    console.log(error);
  }
};

router.get('/', customers);
router.get('/single/:id', singleCustomer);

router.post('/create', createCustomer);
router.post('/editar/:id', editCustomer);
router.post('/drop/:id', dropCustomer);

module.exports = router;
