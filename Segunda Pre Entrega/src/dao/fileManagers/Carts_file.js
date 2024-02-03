const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

class CartsManager {
    /**
     * Constructor de la clase CartsManager.
     * @param {string} fileName - Nombre del archivo JSON de carritos.
     */
    constructor(fileName) {
        this.fileName = fileName;
    }

    /**
     * Obtiene los datos del archivo JSON.
     * @returns {Promise<Array>} - Retorna una promesa que se resuelve con un array de datos.
     */
    async getData() {
        try {
            const data = await fs.promises.readFile(`./${this.fileName}.json`, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            console.log('Error de lectura!', err);
            throw err;
        }
    }

    /**
     * Obtiene un carrito por su ID.
     * @param {string} id - ID del carrito a buscar.
     * @returns {Promise<Object>} - Retorna una promesa que se resuelve con el carrito encontrado.
     */
    async getById(id) {
        try {
            const data = await this.getData();
            const cart = data.find(carrito => carrito.id === id);
            console.log(cart.length === 0 ? 'Error: Carrito no encontrado' : 'Carrito encontrado');
            return cart;
        } catch (err) {
            console.log('Error de lectura!', err);
            throw err;
        }
    }

    /**
     * Agrega un item al carrito.
     * @param {string} idC - ID del carrito.
     * @param {string} id_prod - ID del producto a agregar.
     * @returns {Promise<Object>} - Retorna una promesa que se resuelve con el carrito actualizado.
     */
    async addItem(idC, id_prod) {
        try {
            let carrito = {};
            const products = await fs.promises.readFile(`./productos.json`, 'utf-8');
            const data = await this.getData();
            const findByIndex = data.findIndex((cart) => cart.id === idC);
            
            carrito = data.find(carrito => carrito.id === idC);
            const productos = carrito.productos;
            let idProdNoExist = true;

            for (let i = 0; i < productos.length; i++) {
                if (productos[i].product === parseInt(id_prod)) {
                    productos[i].quantity += 1;
                    idProdNoExist = false;
                    break;
                }
            }

            if (idProdNoExist) {
                productos.push({
                    product: parseInt(id_prod),
                    quantity: 1,
                });
            }

            const updateItem = data.splice(findByIndex, 1, carrito);
            await fs.promises.writeFile(`./${this.fileName}.json`, JSON.stringify(data));
            return carrito;
        } catch (err) {
            console.log('Error de lectura!', err);
            throw err;
        }
    }

    /**
     * Crea un nuevo carrito.
     * @returns {Promise<string>} - Retorna una promesa que se resuelve con el ID del nuevo carrito.
     */
    async addCart() {
        try {
            const fileExists = fs.existsSync(`./${this.fileName}.json`);

            if (!fileExists) {
                console.log("Creando nuevo archivo vacío.");
                await fs.promises.writeFile(`./${this.fileName}.json`, '[]');
            }

            const data = await this.getData();
            const newCar = {
                id: uuidv4(),
                timestamp: new Date().toLocaleString(),
                productos: [],
            };

            data.push(newCar);
            await fs.promises.writeFile(`./${this.fileName}.json`, JSON.stringify(data));
            return newCar.id;
        } catch (err) {
            console.log('Error de lectura!', err);
            throw err;
        }
    }
}

module.exports = CartsManager;
