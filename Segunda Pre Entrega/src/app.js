import express from 'express';
import handlebars from 'express-handlebars';
import router from './router.js';
import connectMongo from './dao/config/connectDB.js';
import http from 'http';
import socketIo from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
// End middleware configuration

// Motor de plantillas que utilizará express
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');

connectMongo();
router(app);

export { app, server, io };
