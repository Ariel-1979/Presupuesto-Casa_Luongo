const express = require('express');
const model = require('../models/productos');
const { allVendors } = require('../models/proveedores');
const { allCategory } = require('../models/categorias');

const router = express.Router();

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
    req.flash('danger_msg', 'Se produjo un error al Cargar los Productos');
    res.redirect('/producto');
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
    req.flash('danger_msg', 'Se produjo un error al Obtener el Producto');
    res.redirect('/producto');
  }
};

const editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    console.log(obj);
    const editProducts = await model.editProduct(id, obj);
    req.flash('success_msg', 'Producto Editado con Éxito');
    res.redirect('/producto');
  } catch (error) {
    req.flash('danger_msg', 'Se produjo un error al Editar el Producto');
    res.redirect('/producto');
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    await model.createProduct(newProduct);
    req.flash('success_msg', 'Producto Creado con Éxito');
    res.redirect('/producto');
  } catch (error) {
    req.flash('danger_msg', 'Se produjo un error al Crear el Producto');
    res.redirect('/producto');
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await model.deleteProduct(id);
    req.flash('success_msg', 'Producto Borrado con Éxito');
    res.redirect('/producto');
  } catch (error) {
    req.flash('danger_msg', 'Se produjo un error al Borrar el Producto');
    res.redirect('/producto');
  }
};

router.get('/', producto);
router.get('/single/:id', singleProduct);
router.post('/editar/:id', editProduct);
router.post('/create', createProduct);
router.post('/delete/:id', deleteProduct);

module.exports = router;
