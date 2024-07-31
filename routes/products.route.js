const router = require('express').Router();
const productsController = require('../controllers/products.controller.js');

//muestra todos los prodctos de manera dinamica
router.get('/', productsController.products);
//carrito de compras
router.get('/cart', productsController.productCart);
/// modificar para que reciba un :id
router.get('/productdetail/:id', productsController.productDetail);
router.get('/add', productsController.productAddView);
router.post('/add', productsController.productAdd);
// router.get('/productdel', productsController.productDelView);
router.delete('/productdel/:id', productsController.productDel);
// router.get('/productmod', productsController.productModView);
router.put('/productmod/:id', productsController.productMod);

module.exports = router;

//routes para products