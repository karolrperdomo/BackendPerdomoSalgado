import { Router } from 'express'
import cart_manager from './controlador/cart_manager'


// Crear un enrutador para carritos
const CartRouter = Router()
// Instanciar el gestor de carritos
const cart = new cart_manager

// Agregar un nuevo carrito
CartRouter.post("/", async (req, res) =>{
    res.send (await cart.addCart())
})
// Obtener todos los carritos
CartRouter.get('/', async(req, res)=>{
    res.send(await cart.readCart())
})

// Obtener un carrito por su ID
CartRouter.get('/:id', async(req, res)=>{
    res.send(await cart.getCartById(req.params.id))
})

// Agregar un producto a un carrito
CartRouter.post('/:cid/products/:pid', async(req, res)=>{
    let cartId = req.params.cid
    let prodId = req.params.pid
    res.send(await cart.addProdInCart(cartId, prodId))
})

export default CartRouter
