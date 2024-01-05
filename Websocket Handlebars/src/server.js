const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const { Server: ServerIO, Server }  = require('socket.io')
const fs = require('fs');


const cartRouter = require('./routes/carts.router.js')
const productRouter = require('./routes/products.router.js')


const productsData = fs.readFileSync('./src/jsonDb/products.json', 'utf-8');
const productos = JSON.parse(productsData);



app.use(express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// Configuración de Handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
    res.render('home', { productos });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { productos });
});


app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)


const httpServer = app.listen(8080, () => {
    console.log('Server listening on port 8080');
});

const io = new ServerIO(httpServer)

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.emit('updateProducts', productos);

    socket.on('addProduct', (newProduct) => {
        // Agregar el nuevo producto a la lista
        productos.push(newProduct);
    
        // Guardar los cambios en el archivo JSON
        fs.writeFile('./src/jsonDb/products.json', JSON.stringify(productos), (err) => {
            if (err) {
                console.error('Error writing to products.json', err);
                return;
            }
            console.log('Product added and database updated.');
    
            // Emitir la lista actualizada de productos a todos los clientes
            io.emit('updateProducts', productos);
        });
    });
});