const express = require('express');
const model = require('../models/usuario');
const router = express.Router();

const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const user = await model.createUser(newUser);
    res.redirect('/usuario');
  } catch (error) {
    console.log(error);
  }
};

const allUsers = async (req, res) => {
  try {
    const allUsers = await model.allUsers();
    res.render('./usuarios/allUsers', {
      allUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

const singleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await model.singleUser(id);
    res.render('./usuarios/singleUser', {
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const editUser = await model.editUser(id, user);
    res.redirect('/usuario');
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await model.deleteUser(id);
    res.redirect('/usuario');
  } catch (error) {
    console.log(error);
  }
};

router.get('/', allUsers);
router.get('/single/:id', singleUser);

router.post('/create', createUser);
router.post('/editar/:id', editUser);
router.post('/delete/:id', deleteUser);

module.exports = router;

