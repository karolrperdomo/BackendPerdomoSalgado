// Importar módulos necesarios
import express from 'express';
import Car_Router from '../src/router/cart/cart_routes.js';
import Product_Router from '../src/router/product/product_routes.js';


// Crear una aplicación Express
const app = express();

// Configurar el puerto para el servidor
const PORT = 8080;

// Middleware para parsear las solicitudes JSON entrantes
app.use(express.json());

// Middleware para parsear los datos de formulario entrantes
app.use(express.urlencoded({ extended: true }));

// Configurar rutas para productos y carritos
app.use("/api/products", Product_Router);
app.use("/api/carts", Car_Router);

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

