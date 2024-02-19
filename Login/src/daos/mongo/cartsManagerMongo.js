import cartsModel from "../models/carts.model.js";

class cartManagerMongo {
    // Crear un carrito
    async createCart() {
        const cart = await cartsModel.create({ products: [] });
        return cart;
    }

    // Buscar un carrito por ID
    async getCartById(cartId) {
        const cart = await cartsModel.findById(cartId);
        return cart;
    }

    // Agregar un producto al carrito
    async addProductToCart(cartId, productId) {
        const cart = await cartsModel.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        cart.products.push({ product: productId });
        await cart.save();
        return cart;
    }

    // Obtener todos los productos en un carrito
    async getProductsInCart(cartId) {
        const cart = await cartsModel.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        return cart.products;
    }

    // Actualizar un carrito
    async updateCart(cartId, updatedCart) {
        const result = await cartsModel.findByIdAndUpdate(cartId, updatedCart, { new: true }).lean();
        if (!result) {
            throw new Error('Carrito no encontrado');
        }
        return result;
    }

    async removeProductFromCart(cartId, productId) {
        console.log('Cart ID in removeProductFromCart:', cartId);
        console.log('Product ID in removeProductFromCart:', productId);
        const cart = await cartsModel.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
        console.log(cart.products)
        const productIndex = cart.products.findIndex(item => item._id.toString() === productId);

        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            await cart.save();
            return cart;
        } else {
            throw new Error("Producto no encontrado en el carrito");
        }
    }

    // Actualizar la cantidad de un producto en el carrito
    async updateProductQuantity(cartId, productId, quantity) {
        const cart = await cartsModel.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
        if (productIndex !== -1) {
            // Asegurarse de que la cantidad sea un número válido
            if (isNaN(quantity) || quantity < 0) {
                throw new Error("La cantidad debe ser un número válido y mayor o igual a cero");
            }
            cart.products[productIndex].quantity = quantity;
            await cart.save();
        }

        return cart;
    }

    // Eliminar todos los productos del carrito
    async removeAllProductsFromCart(cartId) {
        const cart = await cartsModel.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        cart.products = [];
        await cart.save();
    }
}

export default cartManagerMongo