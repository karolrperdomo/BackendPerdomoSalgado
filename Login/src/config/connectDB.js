import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // Mantén la cadena de conexión directamente aquí
        await mongoose.connect("mongodb+srv://KAROL:fNruRNRUrgDFemKr@cluster0.uqk30ra.mongodb.net/ecomerce", {
             //await mongoose.connect("mongodb://127.0.0.1:27017/ecomerce")
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('Base de datos connected');
    } catch (error) {
        console.error(error);
    }
};
