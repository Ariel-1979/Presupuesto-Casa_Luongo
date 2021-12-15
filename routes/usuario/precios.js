const express = require('express');
const model = require('../../models/productos');
const { allVendors } = require('../../models/proveedores');
const { allCategory } = require('../../models/categorias');

const router = express.Router();

const producto = async (req, res) => {
  try {
    const proveedor = await allVendors();
    const categoria = await allCategory();
    const allProducts = await model.allProducts();
    res.render('./usuario_nivel/allProducts', {
      layout: 'layoutUsuario',
      allProducts,
      proveedor,
      categoria,
    });
  } catch (error) {
    req.flash('danger_msg', 'Se produjo un error al Cargar los Productos');
    res.redirect('/precios');
  }
};

const singleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const proveedor = await allVendors();
    const categoria = await allCategory();
    const product = await model.singleProduct(id);
    res.render('./usuario_nivel/singleProduct', {
      layout: 'layoutUsuario',
      product,
      proveedor,
      categoria,
    });
  } catch (error) {
    req.flash('danger_msg', 'Se produjo un error al Obtener el Producto');
    res.redirect('/precios');
  }
};

router.get('/', producto);
router.get('/single/:id', singleProduct);

module.exports = router;
