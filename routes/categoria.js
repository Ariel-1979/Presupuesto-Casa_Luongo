const express = require('express');
const model = require('../models/categorias');
const router = express.Router();

const categoria = async (req, res) => {
  try {
    const allCategory = await model.allCategory();
    res.render('./categorias/allCategory', { allCategory });
  } catch (error) {
    req.flash('danger_msg', 'SE PRODUJO UN ERROR AL CARGAR LOS DATOS');
    res.redirect('/categoria');
  }
};

const createCategory = async (req, res) => {
  try {
    const newCategory = req.body;
    await model.createCategory(newCategory);
    req.flash('success_msg', 'CATEGORIA CREADA CON ÉXITO');
    res.redirect('/categoria');
  } catch (error) {
    req.flash('danger_msg', 'SE PRODUJO UN ERROR AL CARGAR LOS DATOS');
    res.redirect('/categoria');
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await model.deleteCategory(id);
    req.flash('success_msg', 'CATEGORIA BORRADA CON ÉXITO');
    res.redirect('/categoria');
  } catch (error) {
    req.flash('danger_msg', 'SE PRODUJO UN ERROR AL BORRAR LA CATEGORIA');
    res.redirect('/categoria');
  }
};

const editCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    await model.editCategory(id, obj);
    req.flash('success_msg', 'CATEGORIA EDITADA CON ÉXITO');
    res.redirect('/categoria');
  } catch (error) {
    req.flash('danger_msg', 'SE PRODUJO UN ERROR AL EDITAR LA CATEGORIA');
    res.redirect('/categoria');
  }
};

const singleCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const singleCategory = await model.singleCategory(id);
    res.render('./categorias/singleCategory', { singleCategory });
  } catch (error) {
    req.flash('danger_msg', 'SE PRODUJO UN ERROR AL AMPLIAR  LA CATEGORIA');
    res.redirect('/categoria');
  }
};

router.get('/', categoria);
router.post('/create', createCategory);
router.post('/delete/:id', deleteCategory);
router.get('/single/:id', singleCategory);
router.post('/edit/:id', editCategory);

module.exports = router;
