const express = require('express');
const router = express.Router();
const fs = require('fs');
const { Server: ServerIO } = require('socket.io');

const productsData = fs.readFileSync('./src/jsonDb/products.json', 'utf-8');
const productos = JSON.parse(productsData);

router.get('/', (req, res) => {
    res.render('realTimeProducts', { productos });
});

// Agregar una ruta para manejar la creación de nuevos productos por WebSocket
router.post('/add-product', (req, res) => {
    // Obtener los datos del producto del formulario
    const { productName } = req.body;

    // Agregar el nuevo producto a la lista de productos
    productos.push(productName);

    // Emitir el evento 'addProduct' a través del socket.io al cliente
    io.emit('addProduct', productName);

    // Enviar una respuesta al cliente, por ejemplo, un código 200 para indicar éxito
    res.status(200).send('Product added successfully');
});

module.exports = router;