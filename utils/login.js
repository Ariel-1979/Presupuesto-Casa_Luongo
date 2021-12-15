const express = require('express');
const router = express.Router();

function deshabilitado(req, res) {
  req.flash('danger_msg', 'USUARIO SIN AUTORIZACIÓN PARA ACCEDER');
  res.redirect('/');
}

function comprobacion(req, res, nivel) {
  if (nivel === 'Administrador') {
    req.session.autenticado = nivel;
    res.redirect('/presupuesto');
  } else {
    req.session.autenticado = nivel;
    res.redirect('/precios');
  }
}

module.exports = { deshabilitado, comprobacion };
