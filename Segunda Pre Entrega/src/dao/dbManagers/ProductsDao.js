const Products = require('../models/product.model');

class ProductsDao {
    /**
     * Encuentra todos los productos con paginación y filtros opcionales.
     * @param {Object} customQuery - Filtro personalizado (opcional).
     * @param {number} page - Número de página.
     * @param {number} limitValue - Límite de productos por página.
     * @param {string} sort - Criterio de ordenamiento.
     * @returns {Object} - Retorna un objeto con información de paginación y la lista de productos.
     */
    async findAll(customQuery, page, limitValue, sort) {
        try {
            let query = customQuery ? { category: customQuery } : {};
            const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages, prevLink, nextLink } = await Products.paginate(query, { limit: Number(limitValue), page: Number(page), sort: { price: sort }, lean: true });

            return { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages, prevLink, nextLink, page, limitValue, sort, customQuery };
        } catch (error) {
            console.log("No se pudo traer los productos. " + error);
            return { error: "No se pudo traer los productos." };
        }
    }

    /**
     * Obtiene un producto por su ID.
     * @param {string} pid - ID del producto.
     * @returns {Object} - Retorna el producto encontrado o un objeto con un mensaje de error.
     */
    async getById(pid) {
        try {
            const prod = await Products.findById({ _id: pid });
            return prod;
        } catch (error) {
            console.log("No se pudo traer el producto. " + error);
            return { error: "No se pudo traer el producto." };
        }
    }

    /**
     * Inserta un nuevo producto.
     * @param {Object} newProductInfo - Información del nuevo producto.
     * @returns {string|Object} - Retorna el ID del nuevo producto creado o un objeto con un mensaje de error.
     */
    async insertOne(newProductInfo) {
        const { title, description, category, price, thumbnail, code, stock } = newProductInfo;
        if (!title || !description || !category || !price || !thumbnail || !code || !stock) {
            return { error: "Todos los campos son obligatorios" };
        }
        try {
            const newProduct = await Products.create(newProductInfo);
            return newProduct._id;
        } catch (error) {
            console.log("No se pudo insertar el producto. " + error);
            return { error: 'Hubo un error al crear el producto' };
        }
    }

    /**
     * Actualiza un producto por su ID.
     * @param {Object} item - Nuevos datos del producto.
     * @param {string} itemId - ID del producto a actualizar.
     * @returns {Object} - Retorna el estado del producto después de la actualización o un objeto con un mensaje de error.
     */
    async update(item, itemId) {
        try {
            let { title, description, category, price, status, thumbnail, code, stock } = item;
            let existProduct = await Products.findById(itemId);
            if (existProduct) {
                const prod = await Products.updateOne(
                    { _id: itemId },
                    {
                        $set: {
                            title: title,
                            description: description,
                            category: category,
                            price: price,
                            thumbnail: thumbnail,
                            code: code,
                            stock: stock
                        }
                    }
                );
                return prod;
            }
        } catch (error) {
            console.log("No se pudo insertar el producto. " + error);
        }
    }

    /**
     * Elimina un producto por su ID.
     * @param {string} itemId - ID del producto a eliminar.
     * @returns {Object} - Retorna el estado del producto después de la eliminación o un objeto con un mensaje de error.
     */
    async deleteById(itemId) {
        try {
            const prod = await Products.deleteOne({ _id: itemId });
            return prod;
        } catch (error) {
            console.log("No se pudo borrar el producto. " + error);
        }
    }
}

module.exports = ProductsDao;
