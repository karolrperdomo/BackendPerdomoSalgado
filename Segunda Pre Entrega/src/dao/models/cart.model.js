const mongoose = require('mongoose');

// Define el nombre de la colección
const cartCollection = 'cart';

// Define el esquema del carrito
const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products", // Referencia al modelo de productos
            },
            quantity: {
                type: Number
            },
        }
    ],
    timestamp: {
        type: Date, // Utiliza el tipo de dato Date para almacenar la fecha y hora
        default: Date.now, // Establece la fecha y hora actual por defecto
    },
});

// Crea el modelo de carritos
const CartModel = mongoose.model(cartCollection, cartSchema);

// Exporta el modelo para su uso en otras partes de la aplicación
module.exports = CartModel;
