const pool = require('../utils/bd');
const express = require('express');
const model = require('../models/presupuesto');
const {
  singleProduct,
  allProducts,
  addOrder,
} = require('../models/presupuesto');
const { allVendors } = require('../models/proveedores');
const { allCategory } = require('../models/categorias');
const { allCustomers } = require('../models/clientes');
const PDF = require('pdfkit-construct');
const { application } = require('express');
const router = express.Router();

/*Variable para asignar a un Cliente un Pedido Específico  */
let id_presupuesto;

const createBudget = async (req, res) => {
  try {
    const id_cliente = req.params.id;
    const newBudget = await model.createBudget(id_cliente);
    const { insertId } = newBudget;
    id_presupuesto = insertId;
    /* const newOrder = await model.createOrder(id_presupuesto); */
    /*  res.redirect('/presupuesto/productos'); */
    const productos = await allProducts();
    res.render('./presupuestos/productos', {
      productos,
      insertId,
    });
  } catch (error) {
    console.log(error);
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
    });
  } catch (error) {
    console.log(error);
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
    });
  } catch (error) {
    console.log(error);
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
    const pedido = await model.createOrder(obj);
    res.redirect('/presupuesto/productos');
  } catch (error) {
    console.log(error);
  }
};

const getOrder = async (id) => {
  try {
    const presupuesto = await model.getOrder(id);
    return presupuesto;
  } catch (error) {
    console.log(error);
  }
};

const deleteProductOrder = async (req, res) => {
  try {
    const pedidos = req.params.pedidos;
    const delProductOrder = await model.deleteProductOrder(pedidos);
    res.redirect('/presupuesto/productos');
  } catch (error) {
    console.log(error);
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
      layout: false,
    });
  } catch (error) {
    console.log(error);
  }
};

const getPDF = async (req, res) => {
  const { id } = req.params;
  const pedidoPDF = await model.getOrder(id);
  const clienteID = await model.getCustomerID(id);
  const id_cliente = clienteID[0].id_cliente;
  const clientePDF = await model.getCustomerPdf(id_cliente);

  console.log(pedidoPDF);

  const doc = new PDF({ buufferPage: true });
  const filename = `Factura${Date.now()}.pdf`;
  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-disposition': `attachment;filename=${filename}`,
  });
  doc.on('data', (data) => {
    stream.write(data);
  });
  doc.on('end', () => {
    stream.end();
  });

  doc.setDocumentHeader(
    {
      height: '20%',
    },
    () => {
      doc.fontSize(20).text('PRESUPUESTO', {
        width: 420,
        align: 'center',
      });
      doc.fontSize(14);
      doc.text('Datos del Comercio', {
        width: 420,
        align: 'left',
      });
      doc.text(`Nombre: ${clientePDF[0].nombre}`, {
        width: 350,
        align: 'right',
      });
      doc.text(`Apellido: ${clientePDF[0].apellido}`, {
        width: 350,
        align: 'right',
      });
    }
  );
  doc.addTable(
    [
      { key: 'cantidad', label: 'Cantidad', align: 'center' },
      { key: 'producto', label: 'Producto', align: 'center' },
      { key: 'precio', label: 'Precio', align: 'center' },
      { key: 'subtotal', label: 'Subtotal', align: 'center' },
    ],
    pedidoPDF,
    {
      border: null,
      width: 'fill_body',
      striped: true,
      stripedColors: ['#f6f6f6', '#f6f6f6'],
      cellsPadding: 10,
      marginLeft: 30,
      marginRight: 30,
      headAlign: 'center',
    }
  );
  doc.setDocumentFooter({ height: '60%' }, () => {
    doc.fontSize(15).text('TOTAL', doc.footer.x + 450, doc.footer.y + 10);
  });
  doc.render();
  doc.end();
};

router.get('/', presupuesto);
router.get('/productos', getProducts);

router.post('/create/:id', createBudget);
router.post('/createOrder/:id', createOrder);
router.post('/deleteOrder/:pedidos', deleteProductOrder);
router.post('/pdf/:id', viewPDF);
router.get('/pdf/:id', getPDF);

module.exports = router;
