const mongoose = require('mongoose');
const Cart = require('../models/cartModel'); // Asegúrate de tener el modelo correcto aquí

async function createCart(user) {
    try {
        const newCart = await Cart.create({ user, products: [] });
        return newCart;
    } catch (error) {
        throw error;
    }
}

async function getCartByUser(user) {
    try {
        const cart = await Cart.findOne({ user });
        return cart;
    } catch (error) {
        throw error;
    }
}

async function addProductToCart(user, productId, quantity) {
    try {
        const cart = await Cart.findOne({ user });
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        const existingProductIndex = cart.products.findIndex(
            (product) => product.product.toString() === productId
        );

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        return cart;
    } catch (error) {
        throw error;
    }
}

// Puedes agregar otras operaciones según sea necesario

module.exports = {
    createCart,
    getCartByUser,
    addProductToCart,
    // Agrega otras funciones según sea necesario
};
