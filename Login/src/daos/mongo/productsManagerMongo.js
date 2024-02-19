import productsModel from "../models/products.model.js";

class ProductManagerMongo {
    async getProducts() {
        try {
            return await productsModel.find({ isActive: true });
        } catch (error) {
            console.error(error);
        }
    }

    async getProductById(pid) {
    try {
        return await productsModel.findOne({ _id: pid });
    } catch (error) {
        console.error(error);
    }
    }

    async createproduct(newProduct) {
        try {
            return await productsModel.create(newProduct);
        } catch (error) {
            console.log(error);
        }
        }

    async updateProduct(data) {
        try {
            return await productsModel.findByIdAndUpdate(
                { _id: data.idProduct },
                {
                title: data.title,
                description: data.description,
                code: data.code,
                price: data.price,
                stock: data.stock,
                category: data.category,
                thumbnail: data.thumbnail,
                page: data.page
                }
            );
        } catch (error) {
            console.log(error);
        }
        }

    async deleteProduct(pid) {
        try {
            return await productsModel.findByIdAndUpdate(
            { _id: pid },
            { isActive: false }
            );
        } catch (error) {
            console.log(error);
        }
    }

    async getProductCode(code) {
        return await productsModel.findOne({ code });
    }


    // Provisional hasta que tengamos una coleccion de categorias en la base de datos
    async getUniqueCategories() {
        try {
            const allProducts = await productsModel.find({ isActive: true });
            const allCategories = allProducts.map(product => product.category);
            const uniqueCategoriesSet = new Set(allCategories);
            const uniqueCategories = [...uniqueCategoriesSet];
            return uniqueCategories;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default ProductManagerMongo;