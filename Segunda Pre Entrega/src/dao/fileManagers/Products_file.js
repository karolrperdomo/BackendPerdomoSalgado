const fs = require("fs");

class ProductManager {
    constructor(path) {
        // Inicializa el gestor de productos con la ruta del archivo JSON y obtiene los productos existentes.
        this.path = path;
        this.products = [];
        this.getProducts();
    }

    async addProduct(title, description, productN, price, thumbnail, code, stock) {
        try {
            // Verifica si se proporcionan los datos necesarios para agregar un producto.
            if (title && description && price && thumbnail && code && stock) {
                // Crea un objeto de producto.
                let item = {
                    title: title,
                    description: description,
                    product: productN,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                };

                // Lee los datos existentes del archivo JSON.
                let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
                data = JSON.parse(data);

                // Verifica si el archivo está vacío.
                if (data.length === 0) {
                    data.push(item);
                } else {
                    // Asigna un nuevo ID al producto y lo agrega al array de productos.
                    item.id = data.length + 1;
                    data.push(item);
                }

                // Verifica si el producto ya existe por código antes de guardar.
                if (await this.getProductByCode(item.code) === false) {
                    // Guarda los datos actualizados en el archivo JSON.
                    await fs.promises.writeFile(`./${this.path}.json`, JSON.stringify(data));
                    return item.id;
                } else {
                    // Si el producto ya existe, muestra un mensaje.
                    console.log(`El producto que intenta ingresar ya existe.`);
                }
            }
        } catch (error) {
            console.log(`Hubo un error ${error}`);
        }
    }

    async updateProduct(id, item) {
        try {
            // Busca si existe el producto por código.
            let findProduct = await this.getProductByCode(item.code);

            // Verifica si el producto existe.
            if (findProduct === true) {
                // Lee los datos existentes del archivo JSON.
                let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
                data = JSON.parse(data);

                // Encuentra el índice del producto por ID.
                const findByIndex = data.findIndex((product) => product.id === id);

                // Asigna el ID al item y actualiza el producto en el array.
                item.id = id;
                const updateItem = data.splice(findByIndex, 1, item);

                // Guarda los datos actualizados en el archivo JSON.
                await fs.promises.writeFile(`./${this.path}.json`, JSON.stringify(data));
                return data;
            } else {
                return 'Product Not Found';
            }
        } catch (error) {
            console.log(`Hubo un error ${error}`);
        }
    }

    async getProductByCode(code) {
        try {
            // Lee los datos existentes del archivo JSON.
            let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
            data = JSON.parse(data);

            // Busca el producto por código.
            let resultado = data.find(item => item.code === code);

            // Devuelve true si el producto existe, false si no.
            return resultado ? true : false;
        } catch (err) {
            console.log('Error de lectura!', err);
            return false;
        }
    }

    async getProductById(id) {
        try {
            // Lee los datos existentes del archivo JSON.
            let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
            data = JSON.parse(data);

            // Busca el producto por ID.
            let resultado = data.find(item => item.id === id);

            // Devuelve el producto si existe, "Product Not Found" si no.
            return resultado ? resultado : "Product Not Found";
        } catch (err) {
            console.log('Error de lectura!', err);
            return "Error de lectura";
        }
    }

    async getProducts() {
        try {
            // Verifica si el archivo JSON existe.
            let fileExists = fs.existsSync(`./${this.path}.json`);

            // Si el archivo existe, lee los datos y asigna a la propiedad products.
            if (fileExists) {
                let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
                this.products = JSON.parse(data);
            } else {
                // Si el archivo no existe, crea un archivo vacío.
                await fs.promises.writeFile(`./${this.path}.json`, '[]');
            }
        } catch (err) {
            console.log('Método getProducts. Error de lectura!', err);
        }
    }

    async deleteProductById(id) {
        try {
            // Lee los datos existentes del archivo JSON.
            let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
            data = JSON.parse(data);

            // Busca el producto por ID.
            let resultado = data.find(item => item.id === id);

            // Verifica si el producto existe.
            if (!resultado) {
                return "Product Not Found";
            } else {
                // Filtra los productos excluyendo el que se eliminará y actualiza los ID.
                const newData = data.filter((item) => item.id !== id);
                for (let i = 0; i < newData.length; i++) {
                    newData[i].id = (i + 1);
                }

                // Guarda los datos actualizados en el archivo JSON.
                await fs.promises.writeFile(`./${this.path}.json`, JSON.stringify(newData));
                return "Deleted successfully!";
            }
        } catch (err) {
            console.log('Error de lectura!', err);
            return "Error de lectura";
        }
    }

    async deleteProducts() {
        try {
            // Crea un array vacío y guarda los datos actualizados en el archivo JSON.
            let deleteAll = [];
            await fs.promises.writeFile(`./${this.path}.json`, JSON.stringify(deleteAll));

            // Lee los datos existentes del archivo JSON.
            let deleteData = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
            return deleteData;
        } catch (err) {
            console.log('Error de lectura!', err);
            return "Error de lectura";
        }
    }
}

module.exports = ProductManager;
