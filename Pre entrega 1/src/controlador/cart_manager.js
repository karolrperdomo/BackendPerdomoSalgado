import {promises as fs} from 'fs'
import {nanoid} from 'nanoid'
import ProductManager from './product_manager.js'

const prodManaMetod = new ProductManager

class CartManager {
    constructor() {
        this.path = "./src/models/cart.json"
    }

    existCart = async (id) => {
        let cartExist = await this.readCart()
        return cartExist.find(cart => cart.id === id)
    }

    readCart = async ()=>{
        let cart = await fs.readFile(this.path, "utf-8")
        return JSON.parse(cart)
    }

    writeCart = async (cart) =>{
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    addCart = async () =>{
        let cartOld = await this.readCart()
        let id = nanoid()
        let cartConcat =[{id :id, products : []}, ...cartOld]
        await this.writeCart(cartConcat)
        return "Carrito Agregado"
    }

    getCartById = async (id) =>{
        let idCart = await this.existCart(id)
        if (!idCart) return "Carrito No Encontrado"
        return idCart
    }

    addProdInCart = async (cartId, productId) =>{
        let cartById = await this.existCart(cartId)
        if (!cartById) return "Carrito No Encontrado"

        let productById = await prodManaMetod.exist(productId)
        if (!productById) return "Producto No Encontrado"

        let cartsAll = await this.readCart()
        let cartFilter = cartsAll.filter (cart => cart.id != cartId)

        if(cartById.products.some(prod => prod.id === productId)) {
            let productInCart = cartById.products.find((prod) => prod.id === productId)

            productInCart.quantity++

            let cartsConcat = [cartById, ...cartFilter]
            await this.writeCart(cartsConcat)
            return "Cantidad Agregada" 
        } 

        cartById.products.push({id: productById.id, quantity: 1})
        let cartsConcat = [cartById, ...cartFilter]
        await this.writeCart(cartsConcat)
        return "Producto Agregado al Carrito"
    }
}
        


        

export default CartManager