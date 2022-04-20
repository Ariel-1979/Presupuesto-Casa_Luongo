const express = require('express');
const model = require('../models/usuario');
const sha1 = require('sha1');
const router = express.Router();

const createUser = async (req, res) => {
  try {
    const { password } = req.body;
    req.body.password = sha1(password);
    const newUser = req.body;
    await model.createUser(newUser);
    req.flash('success_msg', 'USUARIO CREADO CON ÉXITO');
    res.redirect('/usuario');
  } catch (error) {
    req.flash('danger_msg', 'ERROR AL CREAR EL USUARIO');
    res.redirect('/usuario');
  }
};

const allUsers = async (req, res) => {
  try {
    const allUsers = await model.allUsers();
    res.render('./usuarios/allUsers', {
      allUsers,
    });
  } catch (error) {
    req.flash('danger_msg', 'ERROR AL CARGAR LOS DATOS');
    res.redirect('/usuario');
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
    req.flash('danger_msg', 'ERROR AL CARGAR LOS DATOS');
    res.redirect('/usuario');
  }
};

const editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    await model.editUser(id, user);
    req.flash('success_msg', 'USUARIO EDITADO CON ÉXITO');
    res.redirect('/usuario');
  } catch (error) {
    req.flash('danger_msg', 'ERROR AL EDITAR LOS DATOS');
    res.redirect('/usuario');
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await model.deleteUser(id);
    req.flash('success_msg', 'USUARIO BORRADO CON ÉXITO');
    res.redirect('/usuario');
  } catch (error) {
    req.flash('danger_msg', 'ERROR AL BORRAR AL USUARIO');
    res.redirect('/usuario');
  }
};

router.get('/', allUsers);
router.get('/single/:id', singleUser);
router.post('/create', createUser);
router.post('/editar/:id', editUser);
router.post('/delete/:id', deleteUser);

module.exports = router;
