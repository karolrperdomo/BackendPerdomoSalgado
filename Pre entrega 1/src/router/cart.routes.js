import { Router } from 'express'
import CartManager from '../controlador/cart_manager.js'

const CartRouter = Router()
const cart = new CartManager

CartRouter.post("/", async (req, res) =>{
    res.send (await cart.addCart())
})

CartRouter.get('/', async(req, res)=>{
    res.send(await cart.readCart())
})

CartRouter.get('/:id', async(req, res)=>{
    res.send(await cart.getCartById(req.params.id))
})

CartRouter.post('/:cid/products/:pid', async(req, res)=>{
    let cartId = req.params.cid
    let prodId = req.params.pid
    res.send(await cart.addProdInCart(cartId, prodId))
})

export default CartRouter