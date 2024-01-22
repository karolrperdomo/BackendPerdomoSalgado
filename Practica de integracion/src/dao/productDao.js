hay un productDao.js 

const mongoose = require('mongoose');
const Product = require('../models/productModel'); // Asegúrate de tener el modelo correcto aquí

async function getAllProducts() {
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        throw error;
    }
}

async function getProductById(productId) {
    try {
        const product = await Product.findById(productId);
        return product;
    } catch (error) {
        throw error;
    }
}

async function addProduct(newProduct) {
    try {
        const addedProduct = await Product.create(newProduct);
        return addedProduct;
    } catch (error) {
        throw error;
    }
}

async function updateProduct(productId, updatedFields) {
    try {
        await Product.findByIdAndUpdate(productId, updatedFields);
    } catch (error) {
        throw error;
    }
}

async function deleteProduct(productId) {
    try {
        await Product.findByIdAndDelete(productId);
    } catch (error) {
        throw error;
    }
}

// Puedes agregar otras operaciones según sea necesario

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    // Agrega otras funciones según sea necesario
};