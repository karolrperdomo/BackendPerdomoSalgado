const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    // Define los campos del esquema
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Crea el modelo Cart basado en el esquema
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
