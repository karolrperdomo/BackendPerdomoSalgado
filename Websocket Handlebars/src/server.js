const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const { Server: ServerIO } = require('socket.io');
const fs = require('fs');

const cartRouter = require('./routes/carts.router.js');
const productRouter = require('./routes/products.router.js');

const productsData = fs.readFileSync('./src/jsonDb/products.json', 'utf-8');
let productos = JSON.parse(productsData);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
const hbs = handlebars.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('home', { productos });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { productos });
});

app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);

const httpServer = app.listen(8080, () => {
    console.log('Server listening on port 8080');
});

const io = new ServerIO(httpServer);

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.emit('updateProducts', productos);

    socket.on('eliminarProducto', (productId) => {
        const success = eliminarProductoPorId(productId);

        // Emitir respuesta al cliente
        socket.emit('eliminarCodigoResponse', success);

        // Actualizar la lista de productos y emitir a todos los clientes
        emitirListaDeProductos();
    });
});

function eliminarProductoPorId(productId) {
    // Retorna true si se elimina correctamente, false si hay algún problema
    productos = productos.filter(producto => producto.id !== productId);
    return true; // o return false; según la lógica real
}

function emitirListaDeProductos() {
    // lista actualizada de productos y emitirla a todos los clientes
    const productos = obtenerListaDeProductos();
    io.emit('updateProducts', productos);
}

function obtenerListaDeProductos() {
    // Lógica para obtener la lista actualizada de productos
    return productos;
}
