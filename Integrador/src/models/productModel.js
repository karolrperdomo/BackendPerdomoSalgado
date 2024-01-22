const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type: [String], // Puede ser un array de URLs de imágenes
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Crea el modelo Product basado en el esquema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
