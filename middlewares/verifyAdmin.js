const verifyAdmin = (req, res, next) => {
  req.session.autenticado == 'Administrador' ? next() : res.redirect('/');
};

const verifyUser = (req, res, next) => {
  req.session.autenticado == 'Usuario' ? next() : res.redirect('/');
};

module.exports = { verifyAdmin, verifyUser };
