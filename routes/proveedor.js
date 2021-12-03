const express = require('express');
const model = require('../models/proveedores');
const router = express.Router();

const proveedor = async (req, res) => {
  try {
    const allVendors = await model.allVendors();
    res.render('./proveedor/allVendors', { allVendors });
  } catch (error) {
    console.log(error);
  }
};

const singleVendor = async (req, res) => {
  try {
    const id = req.params.id;
    const vendor = await model.singleVendor(id);
    res.render('./proveedor/singleVendor', {
      vendor,
    });
  } catch (error) {
    console.log(error);
  }
};

const createVendor = async (req, res) => {
  try {
    const newVendor = req.body;
    const vendor = await model.createVendor(newVendor);
    res.redirect('/proveedor');
  } catch (error) {
    console.log(error);
  }
};

const editVendor = async (req, res) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    const editVendor = await model.editVendor(id, obj);
    res.redirect('/proveedor');
  } catch (error) {
    console.log(error);
  }
};

const deleteVendor = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await model.deleteVendor(id);
    res.redirect('/proveedor');
  } catch (error) {
    console.log(error);
  }
};

router.post('/create', createVendor);
router.get('/', proveedor);
router.get('/single/:id', singleVendor);
router.post('/editar/:id', editVendor);
router.post('/delete/:id', deleteVendor);

module.exports = router;
