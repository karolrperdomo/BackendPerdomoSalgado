const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const { Server: ServerIO } = require('socket.io');
const fs = require('fs');
const { connectDB } = require('./db/connectDB');

const cartRouter = require('./routes/carts.router');
const productRouter = require('./routes/products.router');
const userRouter = require('./routes/users.router');
const messagesRouter = require('./routes/messages.router');

const productsData = fs.readFileSync('./jsonDb/products.json', 'utf-8');
let productos = JSON.parse(productsData);

connectDB();

app.use(express.static(__dirname + '/src/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = handlebars.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views');

app.get('/', (req, res) => res.render('home', { productos }));
app.get('/realtimeproducts', (req, res) => res.render('realTimeProducts', { productos }));

app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/messages', messagesRouter);

const httpServer = app.listen(8080, () => console.log('Server listening on port 8080'));
const io = new ServerIO(httpServer);

io.on('connection', (socket) => {
    emitListaProductos(socket);

    socket.on('eliminarProducto', (productId) => {
        const success = eliminarProductoPorId(productId);
        socket.emit('eliminarCodigoResponse', success);
        emitListaProductos();
    });

    socket.on('addProduct', (newProduct) => {
        agregarNuevoProducto(newProduct);
        emitListaProductos();
    });
});

function eliminarProductoPorId(productId) {
    productos = productos.filter(producto => producto.id !== productId);
    return true;
}

function agregarNuevoProducto(newProduct) {
    productos.push(newProduct);
}

function emitListaProductos(socket) {
    const productos = obtenerListaProductos();
    if (socket) {
        socket.emit('updateProducts', productos);
    } else {
        io.emit('updateProducts', productos);
    }
}

function obtenerListaProductos() {
    return productos;
}
