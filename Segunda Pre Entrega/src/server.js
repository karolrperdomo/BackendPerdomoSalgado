const { app, server, io } = require('./app.js');
const SocketConfig = require('./socket/socketConfig.js');

const port = 3000;

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

// Instancia de SocketHandler para configurar WebSocket
const socketConfig = new SocketConfig(io);
