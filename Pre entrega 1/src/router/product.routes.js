import { Router } from 'express'
import ProductManager from '../controlador/product_manager.js'

const ProdRouter = Router()
const product = new ProductManager()

ProdRouter.get("/", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await product.readProducts())
    let allProd = await product.readProducts()
    let productLimit = allProd.slice(0, limit)
    res.send(productLimit)
})

ProdRouter.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.getProductsById(id))
})

ProdRouter.post("/", async (req, res) => {
    const requiredFields = ['name', 'description', 'price']; // Definir campos obligatorios

    for (const field of requiredFields) {
        if (!(field in req.body)) {
            return res.status(400).send(`El campo '${field}' es obligatorio.`);
        }
    }

    // Si todos los campos requeridos están presentes, continuar con el proceso
    let newProduct = req.body;
    res.send(await product.addProducts(newProduct));
})

ProdRouter.put("/:id", async (req, res) => {
    let id = req.params.id
    let putBody = req.body
    res.send(await product.updateProduct(id, putBody))
})

ProdRouter.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.deleteProducts(id))
})

export default ProdRouter
