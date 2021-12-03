const express = require('express');
const model = require('../models/productos');
const { allVendors } = require('../models/proveedores');
const { allCategory } = require('../models/categorias');

const router = express.Router();

/* GET home page. */
const producto = async (req, res) => {
  try {
    const proveedor = await allVendors();
    const categoria = await allCategory();
    const allProducts = await model.allProducts();
    res.render('./productos/allProducts', {
      allProducts,
      proveedor,
      categoria,
    });
  } catch (error) {
    console.log(error);
  }
};

const singleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const proveedor = await allVendors();
    const categoria = await allCategory();
    const product = await model.singleProduct(id);
    res.render('./productos/singleProduct', {
      product,
      proveedor,
      categoria,
    });
  } catch (error) {
    console.log(error);
  }
};

const editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    console.log(obj);
    const editProducts = await model.editProduct(id, obj);
    res.redirect('/producto');
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    console.log(newProduct);
    const addProducts = await model.createProduct(newProduct);
    res.redirect('/producto');
  } catch (error) {
    console.log(error);
  }
};

router.get('/', producto);

router.get('/single/:id', singleProduct);
router.post('/editar/:id', editProduct);

router.post('/create', createProduct);

module.exports = router;
