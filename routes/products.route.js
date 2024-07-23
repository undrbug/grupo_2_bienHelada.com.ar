const router = require('express').Router();
const productsController = require('../controllers/products.controller.js');

router.get('/', productsController.products);
router.get('/cart', productsController.productCart);
router.get('/productdetail', productsController.productDetail);
router.get('/add', productsController.productAddView);
router.post('/add', productsController.productAdd);
// router.get('/productdel', productsController.productDelView);
router.delete('/productdel/:id', productsController.productDel);
// router.get('/productmod', productsController.productModView);
router.put('/productmod/:id', productsController.productMod);

module.exports = router;

//routes para products