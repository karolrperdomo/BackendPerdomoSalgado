import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { connectDB } from './dao/config/connectDB.js';

import productsRouter from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';
import socketProducts from './socket/socketProducts.js';
import socketChat from './socket/socketMesagges.js';

const app = express();
const PORT = 8080 || process.env.PORT;

connectDB();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', cartsRouter);
app.use('/api', productsRouter);
app.use('/', viewsRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

const httpServer = app.listen(PORT, () => {
    try {
        console.log(`Servidor Express Puerto ${PORT}\nAcceder a:`);
        console.log(`\t1). http://localhost:${PORT}/api/products`);
        console.log(`\t2). http://localhost:${PORT}/api/carts`);
        console.log(`\t3). http://localhost:${PORT}/realtimeproducts`);
    } catch (err) {
        console.log(err);
    }
});

const socketServer = new Server(httpServer);
socketProducts(socketServer);
socketChat(socketServer);
