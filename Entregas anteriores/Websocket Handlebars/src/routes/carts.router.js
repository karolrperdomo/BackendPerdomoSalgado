const express = require('express')
const CartsManager = require('../manager/cartsManager')

const router = express.Router()

const cartsService = new CartsManager()

router.post('/', async (req, res)=>{
    try {
        const result = await cartsService.createCart()
        res.send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        res.status(500).send(`Error de server ${error.message}`)
    }
})
router.get('/:cid', async (req, res)=>{
    try {
        const {cid} = req.params
        const cart = await cartsService.getCartById(parseInt(cid))
        res.send({
            status: 'success',
            payload: cart
        })
    } catch (error) {
        console.log(error)
    }
})
router.post('/:cid/product/:pid', async (req, res)=>{
    try {
        const {cid, pid} = req.params
        const result = await cartsService.addProductToCart(Number(cid), Number(pid))
        res.send({
            status: 'success',
            payload: result
    })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router