const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/Products.controller');
const isAdminAuthenticated = require('../middlewares/isAdminAuthenticated');

router.get('/', ProductsController.getAllProducts);

router.post('/', isAdminAuthenticated, ProductsController.createProduct);

router.patch('/:id', isAdminAuthenticated, ProductsController.updateProduct);

router.delete('/:id', isAdminAuthenticated, ProductsController.deleteProduct);

router.patch('/:id/toggle-hadImage', isAdminAuthenticated, ProductsController.toggleHadImage);

module.exports = router;
