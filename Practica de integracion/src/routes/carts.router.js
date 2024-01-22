const express = require('express');
const router = express.Router();
const CartDao = require('../dao/cartsDao'); // Corrige el nombre del archivo DAO

const cartDao = new CartDao();

router.post('/', async (req, res) => {
    try {
        const result = await cartDao.createCart();
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(500).send(`Error de servidor: ${error.message}`);
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartDao.getCartById(parseInt(cid));
        res.send({
            status: 'success',
            payload: cart
        });
    } catch (error) {
        console.log(error);
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await cartDao.addProductToCart(Number(cid), Number(pid));
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
