const express = require('express');
const model = require('../models/usuario');
const sha1 = require('sha1');
const { comprobacion, deshabilitado } = require('../utils/login');
const router = express.Router();

const get = (req, res) => {
  res.render('login', { layout: false });
};

const login = async (req, res) => {
  req.body.password = sha1(req.body.password);
  const inputData = req.body;
  const auth = await model.userAuthentication(inputData);
  if (auth.length === 0) {
    req.flash('danger_msg', 'USUARIO O CLAVE INCORRECTA');
    res.render('login', {
      layout: false,
    });
  } else {
    const { nivel } = auth[0];
    nivel === 'Deshabilitado'
      ? deshabilitado(req, res)
      : comprobacion(req, res, nivel);
  }
};

const logout = (req, res) => {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
};

router.get('/', get);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
