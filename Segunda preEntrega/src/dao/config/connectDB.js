import mongoose from "mongoose";
const URI='mongodb+srv://KAROL:fNruRNRUrgDFemKr@cluster0.uqk30ra.mongodb.net/ecomerce'

const connectDB = () => {
    try {
        mongoose.connect(URI)
        console.log('connected to DB ecommerce')
    } catch (error) {
        console.log(error);
    }
};

export default connectDB



