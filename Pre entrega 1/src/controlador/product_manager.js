import {promises as fs} from 'fs'
import {nanoid} from 'nanoid'

class ProductManager{
    constructor(){
        this.path = "./src/modelos/products.json"
    }
    
    readProducts = async ()=>{
        let products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)
    }
    
    writeProducts = async (product) =>{
        await fs.writeFile(this.path, JSON.stringify(product))
    }
    
    exist = async (id) => {
        let productExist = await this.readProducts()
        return productExist.find(prod => prod.id === id)
    }

    addProducts = async (product) =>{
        let productsOlds = await this.readProducts()
        product.id = nanoid()
        let productAll =[...productsOlds, product]
        await this.writeProducts(productAll)
        return 'Producto Agregado'
    }
    
    getProducts = async () =>{
        return await this.readProducts()
    }

    getProductsById = async (id) =>{
        let productsById = await this.exist(id)
        if (!productsById) return "Producto no encontrado"
        return productsById
    }


    updateProduct = async (id, updateProduct) => {
        let updateProdById = await this.exist(id)
        if(!updateProdById) return "Producto no encontrado"
        await this.deleteProducts(id)
        let productOld = await this.readProducts()
        let products = [{...updateProduct, id : id}, ...productOld]
        await this.writeProducts(products)
        return 'Producto Actualizado'
    }

    deleteProducts = async (id) => {
        let products = await this.readProducts()
        let existeProducts = products.some(prod => prod.id === id)
        if (existeProducts) {
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return 'Producto Eliminado'
        }
        return 'Producto a Eliminar Inexistente'


    }
}

export default ProductManager
