const mongoose = require('mongoose');

// Define el esquema del modelo de usuario
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Crea el modelo de usuario utilizando el esquema definido
const userModel = mongoose.model('User', userSchema);

// Exporta el modelo para que pueda ser utilizado en otros archivos
module.exports = userModel;
