const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/Categories.controller');
const isAdminAuthenticated = require('../middlewares/isAdminAuthenticated');

router.get('/', CategoriesController.getAllCategories);

router.post('/', isAdminAuthenticated, CategoriesController.createCategory);

router.delete('/:categoryId', isAdminAuthenticated, CategoriesController.deleteCategory);

module.exports = router;
