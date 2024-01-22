const CartFileSystemDao = require('../dao/cartFileSystemDao'); // Asegúrate de tener el nombre correcto
const CartMongoDao = require('../dao/cartMongoDao'); // Asegúrate de tener el nombre correcto
const { isMongoEnabled } = require('../../utils'); // Asegúrate de tener el nombre correcto

class CartsManager {
    constructor() {
        if (isMongoEnabled()) {
            this.cartDao = new CartMongoDao();
        } else {
            this.cartDao = new CartFileSystemDao();
        }
    }

    async createCart() {
        return this.cartDao.createCart();
    }

    async getCartById(cartId) {
        return this.cartDao.getCartById(cartId);
    }

    async addProductToCart(cartId, productId) {
        return this.cartDao.addProductToCart(cartId, productId);
    }

    // Puedes agregar otras operaciones según sea necesario
}

module.exports = CartsManager;
