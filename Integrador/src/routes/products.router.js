const express = require('express');
const router = express.Router();
const ProductDao = require('../dao/productDao'); // Importa el DAO correspondiente

const productDao = new ProductDao();

router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit;
        let products = await productDao.getAllProducts();

        if (limit) {
            products = products.slice(0, parseInt(limit));
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Resto del código...

module.exports = router;
