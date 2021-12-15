const express = require('express');
const model = require('../models/proveedores');
const router = express.Router();

const proveedor = async (req, res) => {
  try {
    const allVendors = await model.allVendors();
    res.render('./proveedor/allVendors', { allVendors });
  } catch (error) {
    req.flash('danger_msg', 'SE PRODUJO UN ERROR DE CARGA DE DATOS');
    res.redirect('/proveedor');
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
    req.flash('danger_msg', 'SE PRODUJO UN ERROR DE CARGA DE DATOS');
    res.redirect('/proveedor');
  }
};

const createVendor = async (req, res) => {
  try {
    const newVendor = req.body;
    await model.createVendor(newVendor);
    req.flash('success_msg', 'PROVEEDOR CREADO CON ÉXITO');
    res.redirect('/proveedor');
  } catch (error) {
    req.flash('danger_msg', 'ERROR AL CREAR EL PROVEEDOR');
    res.redirect('/proveedor');
  }
};

const editVendor = async (req, res) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    await model.editVendor(id, obj);
    req.flash('success_msg', 'PROVEEDOR EDITADO CON ÉXITO');
    res.redirect('/proveedor');
  } catch (error) {
    req.flash('danger_msg', 'ERROR AL EDITAR EL PROVEEDOR');
    res.redirect('/proveedor');
  }
};

const deleteVendor = async (req, res) => {
  try {
    const id = req.params.id;
    await model.deleteVendor(id);
    req.flash('success_msg', 'PROVEEDOR BORRADO CON ÉXITO');
    res.redirect('/proveedor');
  } catch (error) {
    req.flash('danger_msg', 'ERROR AL BORRAR EL PROVEEDOR');
    res.redirect('/proveedor');
  }
};

router.post('/create', createVendor);
router.get('/', proveedor);
router.get('/single/:id', singleVendor);
router.post('/editar/:id', editVendor);
router.post('/delete/:id', deleteVendor);

module.exports = router;
