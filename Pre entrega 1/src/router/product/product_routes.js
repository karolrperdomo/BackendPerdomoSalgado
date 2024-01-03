import { Router } from "express";
import product_manager from ".../controlador/product_manager";

// Crear un enrutador para productos
const ProductRouter = Router();
// Instanciar el controlador de productos
const product = new product_manager();

// Obtener todos los productos o los primeros "limit" productos
ProductRouter.get("/", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await product.readProducts());
    let allProd = await product.readProducts();
    let productLimit = allProd.slice(0, limit);
    res.send(productLimit);
});

// Obtener un producto por su ID
ProductRouter.get("/:id", async (req, res) => {
    let id = req.params.id;
    res.send(await product.getProductsById(id));
});

// Agregar un nuevo producto
ProductRouter.post("/", async (req, res) => {
    let newProduct = req.body;
    res.send(await product.addProducts(newProduct));
});

// Actualizar un producto por su ID
ProductRouter.put("/:id", async (req, res) => {
    let id = req.params.id;
    let putBody = req.body;
    res.send(await product.updateProduct(id, putBody));
});

// Eliminar un producto por su ID
ProductRouter.delete("/:id", async (req, res) => {
    let id = req.params.id;
    res.send(await product.deleteProducts(id));
});

export default ProductRouter;
