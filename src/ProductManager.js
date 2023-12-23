const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Clase que gestiona la manipulación de productos
class ProductManager {
    constructor(filePath) {
        // Ruta del archivo de productos
        this.path = filePath;
        // Arreglo que almacenará los productos
        this.products = [];
        // Cargar productos desde el archivo al inicializar la instancia
        this.loadProducts();
    }

    // Método privado para cargar productos desde el archivo
    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            // Parsear los datos del archivo JSON y asignarlos al arreglo de productos
            this.products = JSON.parse(data);
        } catch (error) {
            // Si hay un error al leer el archivo, se asume que aún no hay productos.
            this.products = [];
        }
    }

    // Método privado para guardar productos en el archivo
    saveProducts() {
        // Convertir el arreglo de productos a formato JSON con formato y guardarlo en el archivo
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data, 'utf8');
    }

    // Método para generar un nuevo ID autoincrementable para los productos
    generateId() {
        return this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    }

    // Método para agregar un nuevo producto al arreglo y guardarlo en el archivo
    addProduct(product) {
        // Validación de datos de entrada
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            throw new Error('Los campos title, description, price, thumbnail, code y stock son obligatorios.');
        }

        // Crear un nuevo producto con un ID autoincrementable
        const newProduct = {
            id: this.generateId(),
            ...product,
        };
        // Agregar el nuevo producto al arreglo
        this.products.push(newProduct);
        // Guardar los productos actualizados en el archivo
        this.saveProducts();
    }

    // Método para obtener todos los productos
    getProducts() {
        return this.products;
    }

    // Método para obtener un producto por su ID
    getProductById(id) {
        // Buscar el producto en el arreglo por su ID
        const product = this.products.find((p) => p.id === id);
        // Si el producto no se encuentra, lanzar un error
        if (!product) {
            throw new Error(`Producto con id ${id} no encontrado.`);
        }
        // Devolver el producto encontrado
        return product;
    }

    // Método para actualizar un producto por su ID
    updateProduct(id, updatedFields) {
        // Encontrar el índice del producto en el arreglo por su ID
        const index = this.products.findIndex((p) => p.id === id);
        // Si el producto se encuentra, actualizar sus campos y guardar en el archivo
        if (index !== -1) {
            this.products[index] = {
                ...this.products[index],
                ...updatedFields,
                id: id,
            };
            this.saveProducts();
        } else {
            // Si el producto no se encuentra, lanzar un error
            throw new Error(`Producto con id ${id} no encontrado.`);
        }
    }

    // Método para eliminar un producto por su ID
    deleteProduct(id) {
        // Encontrar el índice del producto en el arreglo por su ID
        const index = this.products.findIndex((p) => p.id === id);
        // Si el producto se encuentra, eliminarlo y guardar en el archivo
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
        } else {
            // Si el producto no se encuentra, lanzar un error
            throw new Error(`Producto con id ${id} no encontrado.`);
        }
    }
}

// Crear una instancia de la clase ProductManager con la ruta del archivo de productos
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
        res.status(400).send({ status: 'error', error: error.message });
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
        res.status(400).send({ status: 'error', error: error.message });
    }
});

// Endpoint para eliminar un producto
app.delete('/api/products/:productId', (req, res) => {
    const { productId } = req.params;
    try {
        productManager.deleteProduct(parseInt(productId));
        res.send({ status: 'success', message: 'Producto eliminado satisfactoriamente' });
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message });
    }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ status: 'error', error: 'Ruta no encontrada' });
});

// Iniciar el servidor en el puerto 8080
app.listen(8080, () => {
    console.log('Escuchando en el puerto 8080');
});
