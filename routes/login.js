const express = require('express');
const model = require('../models/usuario');
const router = express.Router();

/* const { auth } = require('../models/usuarios');
const sha1 = require('sha1'); */

const get = (req, res) => {
  res.render('login', { layout: false });
};

const login = async (req, res) => {
  const { user, password } = req.body;
  const auth = await model.auth({ user, password });
  if (auth.length === 0) {
    res.render('login', {
      layout: false,
      message: 'Datos Incorrectos',
    });
  } else {
    const id = auth[0].id;
    const nivel = auth[0].nivel;
    if (nivel === 'Administrador') {
      res.redirect('/presupuesto');
    } else {
      res.redirect('/productos');
    }
    /* controlar(id, nivel); */
  }
};

/* const login = async (req, res) => {
  try {
    req.body.clave = sha1(req.body['clave']);
    const obj = req.body;
    const result = await model.auth(obj);
    if (result.length === 0) {
      res.render('login', {
        layout: false,
        message: 'Usuario o Clave Incorrecta',
      });
    }
    const { id, nivel } = result;
    console.log('id', id);
    console.log('nivel', nivel);

    req.session.idUser = id_usuario;
    req.session.rol = rol;
    if (nivel == 'Administrador') {
      console.log(nivel);
      res.redirect('/presupuesto');
    } else if (nivel == 'Usuario') {
      res.redirect('/precios');
    } else {
      res.render('index', {
        layout: false,
        message: 'Acceso Deshabilitado',
      });
    }
  } catch (e) {
    console.log(e);
  }
}; */

router.get('/', get);
router.post('/login', login);

module.exports = router;
