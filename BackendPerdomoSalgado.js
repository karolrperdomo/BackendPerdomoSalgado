class ProductManager {
    /**
     * Constructor de la clase ProductManager.
     * Inicializa la lista de productos y el contador de ID.
     */
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }

    /**
     * Método para agregar un nuevo producto.
     * @param {Object} productData - Datos del producto a agregar.
     * @param {string} productData.title - Nombre del producto.
     * @param {string} productData.description - Descripción del producto.
     * @param {number} productData.price - Precio del producto.
     * @param {string} productData.thumbnail - Ruta de la imagen del producto.
     * @param {string} productData.code - Código identificador del producto.
     * @param {number} productData.stock - Número de piezas disponibles.
     * @returns {Object} - El producto agregado.
     * @throws {Error} - Si alguno de los campos es nulo o si el código ya existe.
     */
    addProduct(productData) {
        const { title, description, price, thumbnail, code, stock } = productData;

        // Validar campos obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Todos los campos son obligatorios');
        }

        // Validar código único
        if (this.products.some(product => product.code === code)) {
            throw new Error('Ya existe un producto con ese código');
        }

        // Agregar producto con id
        const newProduct = {
            id: this.productIdCounter++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.push(newProduct);
        console.log('Producto agregado:', newProduct);
        return newProduct; // Devolver el nuevo producto agregado
    }

    /**
     * Método para obtener todos los productos.
     * @returns {Array} - Lista de todos los productos.
     */
    getProducts() {
        return this.products;
    }

    /**
     * Método para buscar un producto por su ID.
     * @param {number} productId - ID del producto a buscar.
     * @returns {Object|undefined} - Producto encontrado o undefined si no se encuentra.
     * @throws {Error} - Si no se encuentra un producto con el ID especificado.
     */
    getProductById(productId) {
        productId = parseInt(productId); // Convertir a número

        const product = this.products.find(product => product.id === productId);

        if (!product) {
            throw new Error('Producto no encontrado');
        }

        console.log('Producto encontrado:', product);
        return product;
    }
}

// Ejemplo con datos
const productManager = new ProductManager();

const product1 = productManager.addProduct({
    title: 'Producto de Prueba',
    description: 'Este es un producto de prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
});

console.log('Todos los productos:', productManager.getProducts());

// Intentar agregar un producto con el mismo código
try {
    productManager.addProduct({
        title: 'Otro Producto',
        description: 'Otra descripción',
        price: 150,
        thumbnail: 'Otra imagen',
        code: 'abc123', // Código repetido
        stock: 30,
    });
} catch (error) {
    console.error('Error al agregar producto:', error.message); // Imprimirá "Ya existe un producto con ese código"
}

// Buscar un producto por ID
try {
    const foundProduct = productManager.getProductById(1);
    console.log('Producto encontrado por ID:', foundProduct);
} catch (error) {
    console.error('Error al buscar producto por ID:', error.message); // Imprimirá "Producto no encontrado"
}
