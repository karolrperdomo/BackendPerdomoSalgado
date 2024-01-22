const ProductFileSystemDao = require('../dao/productFileSystemDao'); // Asegúrate de tener el nombre correcto
const ProductMongoDao = require('../dao/productMongoDao'); // Asegúrate de tener el nombre correcto
const { isMongoEnabled } = require('../../utils'); // Asegúrate de tener el nombre correcto

class ProductManager {
    constructor() {
        if (isMongoEnabled()) {
            this.productDao = new ProductMongoDao();
        } else {
            this.productDao = new ProductFileSystemDao();
        }
    }

    async getProducts() {
        return this.productDao.getProducts();
    }

    async getProductById(productId) {
        return this.productDao.getProductById(productId);
    }

    async addProduct(newProduct) {
        return this.productDao.addProduct(newProduct);
    }

    async updateProduct(productId, updatedFields) {
        return this.productDao.updateProduct(productId, updatedFields);
    }

    async deleteProduct(productId) {
        return this.productDao.deleteProduct(productId);
    }

    // Puedes agregar otras operaciones según sea necesario
}

module.exports = ProductManager;
