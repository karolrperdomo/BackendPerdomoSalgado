import express from 'express';
import cartManagerMongo from '../daos/mongo/cartsManagerMongo.js';
import cartsModel from '../daos/models/carts.model.js';

const router = express.Router();
const cartsManagerMongoInstance = new cartManagerMongo();

router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsModel.findOne({ _id: cid });
        
        if (!cart) {
            console.error('Carrito no encontrado');
            return res.status(404).send('Carrito no encontrado');
        }
        
        console.log(cart.products);
        const cartObject = cart.toObject();
        const carrito = cartObject.products;
        res.render("carts", { carrito });

    } catch (error) {
        res.status(500).send(`Error de servidor. ${error.message}`);
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await cartsModel.create({ products: [] });
        res.send({
            status: "success",
            payload: result,
        });
    } catch (error) {
        res.status(500).send(`Error de servidor. ${error.message}`);
    }
});

// Agregar un producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).send("La cantidad debe ser un número entero positivo.");
        }

        const cart = await cartsModel.findById(cid);
        
        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }
        
        cart.products.push({ product: pid, quantity });
        let result = await cartsModel.findByIdAndUpdate(cid, { $set: { products: cart.products } }, { new: true });
        res.send({
            status: "success",
            payload: result,
        });

    } catch (error) {
        res.status(500).send(`Error de servidor. ${error.message}`);
    }
});

//Agregar un producto a un carrito por query
router.get("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await cartsModel.findById(cid);
        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }

        cart.products.push({ product: pid }); //quantity

        let result = await cartsModel.findByIdAndUpdate(cid, { $set: { products: cart.products } }, { new: true });

        res.redirect('/api/carts/' + cid);
    } catch (error) {
        res.status(500).send(`Error de servidor. ${error.message}`);
    }
});

// Ruta para actualizar el carrito con un arreglo de productos
router.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    try {
        const updatedCart = await cartsManagerMongoInstance.updateCart(cid, { products });
        res.json(updatedCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const updatedCart = await cartsManagerMongoInstance.updateProductQuantity(cid, pid, quantity);
        res.json(updatedCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        await cartsManagerMongoInstance.removeAllProductsFromCart(cid);
        res.json({ message: 'Productos eliminados del carrito correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await cartsManagerMongoInstance.removeProductFromCart(cid, pid);
        res.json(updatedCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
