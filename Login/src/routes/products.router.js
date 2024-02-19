import express from 'express';
import ProductManagerMongo from '../daos/mongo/productsManagerMongo.js';
import proudctModel from '../daos/models/products.model.js';

const router = express.Router();
const managerMongo = new ProductManagerMongo();

router.get('/', async (req, res) => {
    try {
        const {limit = 5, pageQuery = 1, category} = req.query
        const uniqueCategories = await managerMongo.getUniqueCategories(); // Provisional hasta que tengamos una coleccion de categorias en la base de datos
        const query = category ? { category, isActive: true } : { isActive: true };
        const {
            docs,
            hasPrevPage, 
            hasNextPage,
            prevPage, 
            nextPage,
            page 
        } = await proudctModel.paginate(query, {limit, page: pageQuery, sort: {title: -1}, lean: true})
        console.log(page)

        if (!req.session.user) {
            return res.redirect('/');//login
        }
        const user = req.session.user;
        console.log(user);

        res.render('products', {
            product: docs,
            hasPrevPage, 
            hasNextPage,
            prevPage, 
            nextPage,
            page,
            uniqueCategories,
            user
        })
    } catch (error) {
        console.log(error)
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await managerMongo.getProductById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto por ID' });
    }
});

router.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails
        } = req.body;

        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios excepto thumbnails' });
        }

        const newProduct = {
            title,
            description,
            code,
            price: Number(price),
            stock: Number(stock),
            category,
            thumbnails: thumbnails || [],
        };

        const addedProduct = await managerMongo.createproduct(newProduct);

        res.status(201).json(addedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const updatedFields = req.body;

        await managerMongo.updateProduct({ idProduct: productId, ...updatedFields });

        res.json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;

        await managerMongo.deleteProduct(productId);

        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

export default router;