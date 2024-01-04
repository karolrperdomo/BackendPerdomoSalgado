// Importación de módulos y archivos necesarios
import express from 'express'; // Importando el framework Express
import productsRoutes from './routes/products.routes.js'; // Importando las rutas de productos
import { __dirname } from './utils.js'; // Importando la función de utilidad para obtener el directorio actual
import handlebars from 'express-handlebars'; // Importando Handlebars para la representación de plantillas
import viewsRoutes from './routes/views.routes.js'; // Importando las rutas de vistas
import { Server } from 'socket.io'; // Importando el servidor Socket.IO
import socketProducts from './listeners/socketProducts.js'; // Importando el controlador de eventos de Socket.IO para productos

// Creando una instancia del servidor Express
const server = express();
const PORT = 8080; // Estableciendo el puerto del servidor

// Configuración del middleware
server.use(express.static(__dirname + "/public")); // Sirviendo archivos estáticos desde el directorio 'public'
server.use(express.json()); // Analizando las solicitudes JSON entrantes
server.use(express.urlencoded({ extended: true })); // Analizando los datos de formulario entrantes

// Configurando las rutas de la API y las vistas
server.use('/api', productsRoutes); // Rutas de la API para productos
server.use('/', viewsRoutes); // Rutas de vistas

// Iniciando el servidor HTTP y registrando los detalles del servidor
const httpServer = server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`\t1). http://localhost:${PORT}/api/products`);
    console.log(`\t2). http://localhost:${PORT}/api/carts`);
});

// Configurando Handlebars para la representación de plantillas
server.engine('handlebars', handlebars.engine());
server.set('views', __dirname + '/views');
server.set('view engine', 'handlebars');

// Configurando el servidor Socket.IO y adjuntando el controlador de eventos
const socketServer = new Server(httpServer);
socketProducts(socketServer);
