const router = require('express').Router();
const productsController = require('../controllers/products.controller.js');
const upload = require('../services/multerStorage.js');



//muestra todos los prodctos de manera dinamica
router.get('/', productsController.getAllProducts);
//carrito de compras
router.get('/cart', productsController.productCart);
/// modificar para que reciba un :id
router.get('/productdetail/:id', productsController.productDetail);
router.get('/add', productsController.productAddView);
router.post('/add', upload.single('image'), productsController.productAdd);


// router.get('/productdel', productsController.productDelView);
router.delete('/productdel/:id', productsController.productDel);

//modificar producto
router.get('/productmod/:id', productsController.productModView);
router.put('/productmod/:id', upload.single('image'), productsController.productMod);

module.exports = router;

//routes para products