const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = './src/jsonDb/products.json';
    }

    async addProduct(product) {
        try {
            const { code } = product;
            const products = await this.getProductsFromFile();
            
            const codeExists = products.some(p => p.code === code);
            if (codeExists) {
                console.log('Ya existe un producto con ese código');
                return;
            }
    
            const newProduct = {
                id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
                ...product
            };
    
            products.push(newProduct);
            await this.saveProductsToFile(products);
            console.log('Producto añadido correctamente:', newProduct);
            return newProduct;
        } catch (error) {
            console.log('Error al añadir el producto:', error);
        }
    }
    
    async getProducts() {
        try {
            return await this.getProductsFromFile();
        } catch (error) {
            console.log('Error al obtener los productos:', error);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProductsFromFile();
            const product = products.find(p => p.id === id);
            if (!product) {
                console.log('Producto no encontrado');
                return;
            }
            return product;
        } catch (error) {
            console.log('Error obteniendo producto por ID:', error);
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            let products = await this.getProductsFromFile();
            const index = products.findIndex(p => p.id === id);
            if (index === -1) {
                console.log('Producto no encontrado');
                return;
            }
            products[index] = { ...products[index], ...updatedFields };
            await this.saveProductsToFile(products);
            console.log('Producto actualizado correctamente:', products[index]);
        } catch (error) {
            console.log('Error actualizando el producto:', error);
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.getProductsFromFile();
            products = products.filter(p => p.id !== id);
            await this.saveProductsToFile(products);
            console.log('Producto eliminado correctamente');
        } catch (error) {
            console.log('Error al borrar el producto:', error);
        }
    }

    async getProductsFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            } else {
                console.log('Error al leer el archivo:', error);
                return [];
            }
        }
    }

    async saveProductsToFile(products) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.log('Error al escribir en el archivo:', error);
        }
    }
}

module.exports = ProductManager;
