const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            // Si hay un error al leer el archivo, se asume que aún no hay productos.
            this.products = [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data, 'utf8');
    }

    generateId() {
        return this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    }

    addProduct(product) {
        const newProduct = {
            id: this.generateId(),
            ...product,
        };
        this.products.push(newProduct);
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw new Error(`Prooducto con id ${id} no encontrado.`);
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index !== -1) {
            this.products[index] = {
                ...this.products[index],
                ...updatedFields,
                id: id, 
            };
            this.saveProducts();
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
        } else {
            throw new Error(`Producto con id ${id} no encuentro.`);
        }
    }
}

const productManager = new ProductManager('products.json');

// Endpoint para obtener todos los productos
app.get('/api/products', (req, res) => {
    res.send(productManager.getProducts());
});

// Endpoint para obtener un producto por su ID
app.get('/api/products/:productId', (req, res) => {
    const { productId } = req.params;
    try {
        const product = productManager.getProductById(parseInt(productId));
        res.send(product);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
});

// Endpoint para agregar un nuevo producto
app.post('/api/products', (req, res) => {
    const productData = req.body;
    try {
        productManager.addProduct(productData);
        res.status(201).send({ status: 'success', message: 'Producto añadido satisfactoriamente.' });
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message });
    }
});

// Endpoint para actualizar un producto
app.put('/api/products/:productId', (req, res) => {
    const { productId } = req.params;
    const updatedFields = req.body;
    try {
        productManager.updateProduct(parseInt(productId), updatedFields);
        res.send({ status: 'success', message: 'Producto actualizado satisfactoriamente' });
    } catch (error) {
        res.status(404).send({ status: 'error', error: error.message });
    }
});

// Endpoint para eliminar un producto
app.delete('/api/products/:productId', (req, res) => {
    const { productId } = req.params;
    try {
        productManager.deleteProduct(parseInt(productId));
        res.send({ status: 'success', message: 'Producto añadeliminado satisfactoriamente' });
    } catch (error) {
        res.status(404).send({ status: 'error', error: error.message });
    }
});

app.listen(8080, () => {
    console.log('Escuchando en el puerto 8080');
});
