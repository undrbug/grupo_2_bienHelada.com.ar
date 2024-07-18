const router = require('express').Router();
const productsController = require('../controllers/products.controller.js');

router.get('/products', productsController.products);
router.get('/productcart', productsController.productCart);
router.get('/productdetail', productsController.productDetail);

module.exports = router;

//routes para products