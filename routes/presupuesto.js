const express = require('express');
const pool = require('../utils/bd');
const model = require('../models/presupuesto');
const { allProducts } = require('../models/presupuesto');
const { allVendors } = require('../models/proveedores');
const { allCategory } = require('../models/categorias');
const { allCustomers } = require('../models/clientes');
const easyinvoice = require('easyinvoice');
const fs = require('fs');
const path = require('path');
const { nextTick } = require('process');

const router = express.Router();

/*Variable para asignar a un Cliente un Pedido Específico  */
let id_presupuesto;

const createBudget = async (req, res) => {
  try {
    const id_cliente = req.params.id;
    const newBudget = await model.createBudget(id_cliente);
    const { insertId } = newBudget;
    id_presupuesto = insertId;
    const productos = await allProducts();
    res.render('./presupuestos/productos', {
      productos,
      insertId,
    });
  } catch (error) {
    throw error;
  }
};

const presupuesto = async (req, res) => {
  try {
    const proveedor = await allVendors();
    const categoria = await allCategory();
    const productos = await allProducts();
    const clientes = await allCustomers();
    res.render('./presupuestos/clientes', {
      productos,
      proveedor,
      categoria,
      clientes,
      message: 'PRESUPUESTO',
    });
  } catch (error) {
    throw error;
  }
};

const getProducts = async (req, res) => {
  try {
    const proveedor = await allVendors();
    const categoria = await allCategory();
    const productos = await allProducts();
    const presupuesto = await getOrder(id_presupuesto);
    let subtotal = new Number();
    let total = new Number();
    subtotal = presupuesto.map(
      (presupuesto) => presupuesto.subtotal + subtotal
    );
    subtotal.forEach((element) => {
      total = total + element;
      console.log(total);
    });
    res.render('./presupuestos/productos', {
      productos,
      proveedor,
      categoria,
      presupuesto,
      total,
      message: 'PRESUPUESTO',
    });
  } catch (error) {
    throw error;
  }
};

const createOrder = async (req, res) => {
  try {
    const obj = {
      id: id_presupuesto,
      producto: req.body.producto,
      precio: req.body.precio,
      cantidad: req.body.cantidad,
      subtotal: req.body.precio * req.body.cantidad,
    };
    await model.createOrder(obj);
    res.redirect('/presupuesto/productos');
  } catch (error) {
    throw error;
  }
};

const getOrder = async (id) => {
  try {
    const presupuesto = await model.getOrder(id);
    return presupuesto;
  } catch (error) {
    throw error;
  }
};

const deleteProductOrder = async (req, res) => {
  try {
    const pedidos = req.params.pedidos;
    await model.deleteProductOrder(pedidos);
    res.redirect('/presupuesto/productos');
  } catch (error) {
    throw error;
  }
};

const viewPDF = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoPDF = await model.getOrder(id);
    const clienteID = await model.getCustomerID(id);
    const id_cliente = clienteID[0].id_cliente;
    const clientePDF = await model.getCustomerPdf(id_cliente);
    res.render('./presupuestos/pdf', {
      pedidoPDF,
      clientePDF,
      id,
      message: 'Presupuesto',
    });
  } catch (error) {
    throw error;
  }
};

let imgPath = path.resolve('img', 'Background.jpg');
function base64_encode(img) {
  let png = fs.readFileSync(img);
  return new Buffer.from(png).toString('base64');
}

// DATA OBJECT PDF
const datos = async (req, res) => {
  const { id } = req.params;
  const pedidoPDF = await model.getOrder(id);
  const clienteID = await model.getCustomerID(id);
  const id_cliente = clienteID[0].id_cliente;
  const clientePDF = await model.getCustomerPdf(id_cliente);

  const productos = pedidoPDF.map((key) => {
    return {
      quantity: key.cantidad,
      description: key.producto,
      price: key.precio,
      tax: req.body.tax,
    };
  });

  const presupuestoID = `${pedidoPDF[0].id}`;
  let data = {
    documentTitle: '', //Defaults to INVOICE
    currency: 'USD',
    taxNotation: 'IVA',
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    background: `${base64_encode(imgPath)}`,

    sender: {
      company: '',
      address: 'Aristóbulo del Valle Nro. 3360',
      zip: 'Lanús Oeste - CP. 1824',
      city: 'Buenos Aires',
      country: '',
      custom1: '',
      custom2: 'Teléfono : 4209-2699 / 116-633-1765',
      custom3: 'Email : casaluongo@hotmail.com',
    },
    invoiceNumber: `${pedidoPDF[0].id}`,
    invoiceDate: `${new Date().toLocaleDateString()}`,
    client: {
      company: `Cliente:   ${clientePDF[0].nombre} ${clientePDF[0].apellido}`,
      address: `Domicilio: ${clientePDF[0].direccion}`,
      zip: `Entre calles: ${clientePDF[0].entrecalles}`,
      city: '',
      country: '',
      custom1: `Teléfono:  ${clientePDF[0].telefono}`,
      custom2: `Observaciones: ${clientePDF[0].observaciones}`,
    },
    products: productos,
    bottomNotice: 'Este presupuesto tiene una validez de 48 hs.',
    translate: {
      invoiceDate: ' Fecha ',
      invoiceNumber: 'Presupuesto',
      products: 'Producto',
      quantity: 'Cantidad',
      price: 'Precio',
      subtotal: 'Sub-Total',
      total: 'Total',
    },
  };
  await invoicePdf(data, presupuestoID);
  res.download(`./invoice/Presupuesto_Nro._${presupuestoID}.pdf`);
};

const invoicePdf = async (data, presupuestoID) => {
  let result = await easyinvoice.createInvoice(data);
  fs.writeFileSync(
    `./invoice/Presupuesto_Nro._${presupuestoID}.pdf`,
    result.pdf,
    'base64'
  );
};

router.get('/', presupuesto);
router.get('/productos', getProducts);
router.post('/create/:id', createBudget);
router.post('/createOrder/:id', createOrder);
router.post('/deleteOrder/:pedidos', deleteProductOrder);
router.post('/pdf/:id', viewPDF); //Primer PDF
router.post('/descargar/:id', datos);

module.exports = router;
