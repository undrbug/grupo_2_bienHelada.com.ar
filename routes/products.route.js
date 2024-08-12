const router = require('express').Router();
const productsController = require('../controllers/products.controller.js');
const upload = require('../services/multerStorage.js');

//muestra todos los prodctos de manera dinamica
router.get('/', productsController.getAllProducts);
//carrito de compras vista
router.get('/cart/', productsController.productCartView);
//carrito de compras metodo
router.post('/cart/:id', productsController.productCartAdd);
//detalle de producto
router.get('/productdetail/:id', productsController.productDetail);
//Vista para agregar producto o dar de alta
router.get('/add', productsController.productAddView);
//Metodo para agregar producto con su middleware para cargar imagen
router.post('/add', upload.single('image'), productsController.productAdd);
//Vista para eliminar producto (no se si lo vamos a implementar)
// router.get('/productdel', productsController.productDelView);
//Metodo para eliminar producto
router.delete('/productdel/:id', productsController.productDel);
//Vista para modificar producto
router.get('/productmod/:id', productsController.productModView);
//Metodo para modificar producto con su middleware para cargar imagen
router.put('/productmod/:id', upload.single('image'), productsController.productMod);

module.exports = router;