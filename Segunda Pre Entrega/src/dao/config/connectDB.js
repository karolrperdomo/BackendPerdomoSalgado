import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://KAROL:fNruRNRUrgDFemKr@cluster0.uqk30ra.mongodb.net/ecomerce2")
        //await mongoose.connect("mongodb://127.0.0.1:27017/ecomerce2")
        console.log('Conectado a la base de datos')
    } catch (error) {
        console.log(error)
    }
};
