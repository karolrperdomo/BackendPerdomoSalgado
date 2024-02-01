import mongoose from "mongoose";
const URI='mongodb+srv://Db-ecommerce1:Lm0B2SIOL9eCrjnc@cluster0.3mxdjl3.mongodb.net/ecommerce'

const connectToDB = () => {
    try {
        mongoose.connect(URI)
        console.log('connected to DB ecommerce')
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB
