const { app, server, io } = require('./app.js');
const SocketConfig = require('./socket/socketConfig.js');

const startServer = (port) => {
    server.listen(port, () => {
        console.log(`Server running at port ${port}`);
    });
};

const configureSocket = (io) => {
    const socketConfig = new SocketConfig(io);
};

const initializeApp = () => {
    const port = 3000;

    startServer(port);
    configureSocket(io);
};

initializeApp();
