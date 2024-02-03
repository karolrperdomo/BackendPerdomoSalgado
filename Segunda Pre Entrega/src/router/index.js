const express = require('express');
const router = express.Router();

const usersController = require('../controllers/controller.users');
const productsController = require('../controllers/controller.products');
const cartsController = require('../controllers/controller.carts');
const messagesController = require('../controllers/controller.messages');
const viewsController = require('../controllers/controller.views');

router.use('/users', usersController);
router.use('/api/products', productsController);
router.use('/api/carts', cartsController);
router.use('/api/chats', messagesController);
router.use('/api/views', viewsController);

module.exports = router;
