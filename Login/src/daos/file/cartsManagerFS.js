// import { json } from 'express';
import fs from 'node:fs/promises';

class CartsManagerFS {
    constructor(){
        this.path = './src/mockDB/carts.json'
    }

    async readFile(){
        try {
            const dataCarts = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(dataCarts)
        } catch (error) {
            return []
        }
    }

    async createCart(){
        try {
            const carts = await this.readFile()
            let newCart = {
                id: carts.length + 1,
                products: []
            }
            carts.push(newCart)
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
            return carts
        } catch (error) {
            return `Error al crear un cart ${error}`
        }
    }

    async getCartById(cid){
        try {
            const carts = await this.readFile()
            const cart = carts.find(cart => cart.id === cid)
            if(!cart) {
                return 'No se encuentra el producto'
            }
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(cid, pid){
        try {
            const carts = await this.readFile()
            const cartIndex = carts.findIndex(cart => cart.id === cid)
            if(cartIndex == -1){
                return 'No existe el carrito'
            }
            const productIndex = carts[cartIndex].products.findIndex(producto => producto.product == pid)
            if(productIndex == -1){
                carts[cartIndex].products.push({
                    product: pid,
                    quantity: 1
                })
            } else {
                carts[cartIndex].products[productIndex].quantity += 1
            }
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
            return cart[cartIndex]
        } catch (error) {
            return error
        }
    }


}

export default CartsManagerFS;