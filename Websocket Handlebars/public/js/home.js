const dbPath = path.join(__dirname, 'product.json');

// Función para leer los productos desde el archivo JSON
const readProductsFromDB = () => {
try {
    const productsData = fs.readFileSync(dbPath);
    return JSON.parse(productsData);
} catch (error) {
    console.error('Error al leer el archivo de productos:', error);
    return [];
}
};

// Función para guardar los productos en el archivo JSON
const saveProductsToDB = (products) => {
try {
    fs.writeFileSync(dbPath, JSON.stringify(products, null, 2));
} catch (error) {
    console.error('Error al guardar los productos en el archivo:', error);
}
};

let products = readProductsFromDB();