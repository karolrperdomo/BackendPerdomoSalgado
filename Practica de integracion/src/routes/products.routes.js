import { Router } from 'express'
import { __dirname } from '../utils.js'
import ProductManager from '../dao/controllers/mongo/ProductManagerMongo.js'

const pm = new ProductManager()

const productsRouter = Router()

productsRouter.get("/products",async(req,res)=>{
    const products= await pm.getProducts(req.query)
    res.json({products})
})

productsRouter.get("/products/:pid", async (req, res) => {
    const productfind = await pm.getProductbyId(req.params);
    res.json({ status: "success", productfind });
});

productsRouter.post("/products", async (req, res) => {
    const newproduct = await pm.addProduct(req.body);
    res.json({ status: "success", newproduct });
});

productsRouter.put("/products/:pid", async (req, res) => {
    const updatedproduct = await pm.updateProduct(req.params,req.body);
    res.json({ status: "success", updatedproduct });
});

productsRouter.delete("/products/:pid", async (req, res) => {
    const id=parseInt(req.params.pid)
    const deleteproduct = await pm.deleteProduct(id);
    res.json({ status: "success",deleteproduct });
});

export default productsRouter