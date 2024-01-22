const express = require('express');
const router = express.Router();
const fs = require('fs');
const productsData = fs.readFileSync('./src/jsonDb/products.json', 'utf-8');
const productos = JSON.parse(productsData);
const ProductDao = require('../dao/productDao'); // Importa el DAO correspondiente

const productDao = new ProductDao();

router.get('/', async (req, res) => {
    try {
        const products = await productDao.getAllProducts();
        res.render('home', { productos: products });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

module.exports = router;