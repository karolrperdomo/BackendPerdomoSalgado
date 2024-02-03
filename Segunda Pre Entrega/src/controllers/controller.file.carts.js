const { Router } = require('express');
const CartsManager = require('../dao/fileManagers/Carts_file');

const router = Router();
const carrito = new CartsManager('carrito');

/**
 * Ruta para crear un nuevo carrito.
 * @route POST /carts/
 * @returns {Object} - Mensaje de respuesta.
 */
router.post('/', async (req, res) => {
    try {
        const car = await carrito.addCart();
        res.json({ message: 'Carrito creado: ' + car });
    } catch (error) {
        handleError(res, error);
    }
});

/**
 * Ruta para obtener un carrito por ID.
 * @route GET /carts/:id
 * @param {string} id - ID del carrito.
 * @returns {Object} - Mensaje de respuesta.
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const car = await carrito.getById(id);
        res.json({ message: 'Carrito ' + JSON.stringify(car) });
    } catch (error) {
        handleError(res, error);
    }
});

/**
 * Ruta para agregar un producto a un carrito.
 * @route POST /carts/:idC/products/:id_prod
 * @param {string} idC - ID del carrito.
 * @param {string} id_prod - ID del producto.
 * @returns {Object} - Mensaje de respuesta.
 */
router.post('/:idC/products/:id_prod', async (req, res) => {
    try {
        const { idC, id_prod } = req.params;
        const car = await carrito.addItem(idC, id_prod);
        res.json({ message: 'Agregar producto ' + JSON.stringify(car) });
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
