import express from 'express';
import handlebars from 'express-handlebars';
import http from 'http';
import socketIo from 'socket.io';
import connectMongo from './dao/config/connectDB.js';
import router from './router.js';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configure middleware
configureMiddleware();

// Configure template engine
configureTemplateEngine();

// Connect to MongoDB
connectMongo();

// Configure routes
configureRoutes();

// Start the server
startServer();

function configureMiddleware() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public'));
}

function configureTemplateEngine() {
    app.engine('handlebars', handlebars.engine());
    app.set('views', __dirname + '/views');
}

function configureRoutes() {
    router(app);
}

function startServer() {
    const port = 3000;
    server.listen(port, () => {
        console.log(`Server running at port ${port}`);
    });
}

export { app, server, io };
