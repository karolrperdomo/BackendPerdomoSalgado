const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('TU_CADENA_DE_CONEXION', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
    }
};

module.exports = { connectDB };
