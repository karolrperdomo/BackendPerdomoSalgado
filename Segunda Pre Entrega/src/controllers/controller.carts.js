const { Router } = require('express');
const CartsDao = require('../dao/dbManagers/CartsDao');

const Carts = new CartsDao();
const router = Router();

// Obtiene un carrito por ID
router.get('/:cid', async (req, res) => {
    try {
        let idC = req.params.cid;
        const cart = await Carts.getById(idC);
        res.json({ message: cart });
    } catch (error) {
        handleError(res, error);
    }
});

// Crea un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const product = [];
        const newCart = await Carts.createCart({ product });
        res.json({ message: 'Carrito creado con ID ' + newCart._id });
    } catch (error) {
        handleError(res, error);
    }
});

// Agrega un producto al carrito
router.post('/:cid/products/:pid', async (req, res) => {
    try {
        let idC = req.params.cid;
        let idP = req.params.pid;
        const car = await Carts.post(idC, idP);
        res.json({ message: car });
    } catch (error) {
        handleError(res, error);
    }
});

// Actualiza productos en el carrito
router.put('/:cid', async (req, res) => {
    try {
        let idC = req.params.cid;
        const items = req.body;
        const car = await Carts.putProduct(idC, items);
        res.json({ message: car });
    } catch (error) {
        handleError(res, error);
    }
});

// Actualiza un producto específico en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
    try {
        let idC = req.params.cid;
        let idP = req.params.pid;
        const item = req.body;
        const car = await Carts.putProducts(idC, idP, item);
        res.json({ message: car });
    } catch (error) {
        handleError(res, error);
    }
});

// Elimina todos los productos del carrito
router.delete('/:cid', async (req, res) => {
    try {
        let idC = req.params.cid;
        const car = await Carts.deleteProducts(idC);
        res.json({ message: car });
    } catch (error) {
        handleError(res, error);
    }
});

// Elimina un producto específico del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        let idC = req.params.cid;
        let idP = req.params.pid;
        const car = await Carts.deleteProduct(idC, idP);
        res.json({ message: car });
    } catch (error) {
        handleError(res, error);
    }
});

/**
 * Maneja errores y envía respuestas adecuadas al cliente.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Object} error - Objeto de error.
 */
function handleError(res, error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = router;
