const express = require('express');
const model = require('../models/categorias');
const router = express.Router();

/* GET home page. */
const categoria = async (req, res) => {
  try {
    const allCategory = await model.allCategory();
    res.render('./categorias/allCategory', { allCategory });
  } catch (error) {
    console.log(error);
  }
};

const createCategory = async (req, res) => {
  try {
    const newCategory = req.body;
    const category = await model.createCategory(newCategory);
    res.redirect('/categoria');
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id  = req.params.id;
    const category = await model.deleteCategory(id);
    res.redirect('/categoria');
  } catch (error) {
    console.log(error);
  }
};

router.get('/', categoria);
router.post('/create', createCategory);
router.post('/delete/:id', deleteCategory);


module.exports = router;
