const express = require('express');
const router = express.Router();
const fs = require('fs');
const { Server: ServerIO } = require('socket.io');
const productsData = fs.readFileSync('./src/jsonDb/products.json', 'utf-8');
const productos = JSON.parse(productsData);
const ProductDao = require('../dao/productDao'); // Importa el DAO correspondiente

const productDao = new ProductDao();

router.get('/', async (req, res) => {
    try {
        const products = await productDao.getAllProducts();
        res.render('realTimeProducts', { productos: products });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos en tiempo real' });
    }
});

// Agregar una ruta para manejar la creación de nuevos productos por WebSocket
router.post('/add-product', async (req, res) => {
    // Obtener los datos del producto del formulario
    const { productName } = req.body;

    // Agregar el nuevo producto a la lista de productos
    try {
        const newProduct = await productDao.addProduct({ title: productName });
        // Emitir el evento 'addProduct' a través del socket.io al cliente
        io.emit('addProduct', newProduct);
        // Enviar una respuesta al cliente, por ejemplo, un código 200 para indicar éxito
        res.status(200).send('Product added successfully');
    } catch (error) {
        res.status(500).send('Error adding product');
    }
});

module.exports = router;
