const express = require('express');
const router = express.Router();
const fs = require('fs');

const productsData = fs.readFileSync('./src/jsonDb/products.json', 'utf-8');
const productos = JSON.parse(productsData);

router.get('/', (req, res) => {
    res.render('home', { productos });
});

module.exports = router;