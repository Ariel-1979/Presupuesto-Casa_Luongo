var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const hbs = require('hbs');
const cors = require('cors');
const flash = require('connect-flash');
const session = require('express-session');
const { verifyAdmin, verifyUser } = require('./middlewares/verifyAdmin');
var dotenv = require('dotenv');

dotenv.config();

const loginRouter = require('./routes/login');
const clienteRouter = require('./routes/cliente');
const usuarioRouter = require('./routes/usuario');
const productoRouter = require('./routes/producto');
const proveedorRouter = require('./routes/proveedor');
const categoriaRouter = require('./routes/categoria');
const presupuestoRouter = require('./routes/presupuesto');
const preciosRouter = require('./routes/usuario/precios');
const invoiceRouter = require('./routes/presupuesto');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs', { defaultLayout: 'layout' });
hbs.registerPartials(__dirname + '/views/partials');

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'Luongo_Secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.danger_msg = req.flash('danger_msg');
  next();
});

// Routes
app.use('/', loginRouter);
app.use('/cliente', verifyAdmin, clienteRouter);
app.use('/proveedor', verifyAdmin, proveedorRouter);
app.use('/usuario', verifyAdmin, usuarioRouter);
app.use('/producto', verifyAdmin, productoRouter);
app.use('/categoria', verifyAdmin, categoriaRouter);
app.use('/presupuesto', verifyAdmin, presupuestoRouter);
app.use('/presupuesto', verifyAdmin, invoiceRouter);
app.use('/precios', verifyUser, preciosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
