// productModule.js
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'product.json');

const readProductsFromDB = () => {
    try {
        const productsData = fs.readFileSync(dbPath);
        return JSON.parse(productsData);
    } catch (error) {
        console.error('Error al leer el archivo de productos:', error.message);
        throw new Error('No se pudo leer el archivo de productos.');
    }
};

const saveProductsToDB = (products) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(products, null, 2));
    } catch (error) {
        console.error('Error al guardar los productos en el archivo:', error.message);
        throw new Error('No se pudieron guardar los productos en el archivo.');
    }
};

module.exports = { readProductsFromDB, saveProductsToDB };

// home.js
const productModule = require('./productModule'); // Asegúrate de tener la ruta correcta

let products = productModule.readProductsFromDB();

// Resto del código...

// Ejemplo de cómo utilizarlo
try {
    // Operaciones que modifican productos
    productModule.saveProductsToDB(products);
} catch (error) {
    console.error('Error general:', error.message);
}
