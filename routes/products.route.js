const router = require('express').Router();
const productsController = require('../controllers/products.controller.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const adminMiddleware = require('../middlewares/adminMiddleware.js');
const upload = require('../services/multerProdcutsStorage.js');
const { body } = require('express-validator');

const validationsProducts = [
    body('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('drink_description').notEmpty().withMessage('La descripción del producto es obligatoria'),
    body('category').notEmpty().withMessage('La categoría del producto es obligatoria'),
    body('drink_type').notEmpty().withMessage('El tipo de producto es obligatorio'),
    body('brand').notEmpty().withMessage('La marca del producto es obligatorio'),
    body('Stock').notEmpty().withMessage('La cantidad del producto es obligatoria'),
    body('price').notEmpty().withMessage('El precio del producto es obligatorio'),
    body('Image').custom((value, { req }) => {
            if (req.file) {
                    return true;
                }
                throw new Error('La imagen del producto es obligatoria');
            })
];

//muestra todos los prodctos de manera dinamica
router.get('/', productsController.getAllProducts);
//muestra productos filtrados en el input_search
router.get('/search/:search', productsController.searchProducts);
//carrito de compras vista (hay que moverlo a cart.route.js)
router.get('/cart',authMiddleware, productsController.productCartView);
//carrito de compras metodo
router.post('/cart/:id',authMiddleware, productsController.productCartAdd);
//detalle de producto
router.get('/productdetail/:id', productsController.productDetail);
//Vista para agregar producto o dar de alta
router.get('/add',adminMiddleware, productsController.productAddView);
//Metodo para agregar producto con su middleware para cargar imagen
router.post('/add',adminMiddleware, upload.single('Image'), validationsProducts, productsController.productAdd);
//Vista para eliminar producto (no se si lo vamos a implementar)
// router.get('/productdel', productsController.productDelView);
//Metodo para eliminar producto (tener cuidado, elimina sin pedir confirmacion)
router.delete('/productdel/:id',adminMiddleware, productsController.productDel);
//Vista para modificar producto
router.get('/productmod/:id',adminMiddleware, productsController.productModView);
//Metodo para modificar producto con su middleware para cargar imagen
router.put('/productmod/:id',adminMiddleware, upload.single('Image'), validationsProducts, productsController.productMod);

//rutas (filtros) del footer
router.get ('/beer', productsController.beer)
router.get ('/wine', productsController.wine)
router.get ('/highlighted', productsController.highlighted)
router.get ('/offer', productsController.offer)
// router.get ('/promotion', productsController.promotion)

router.get('/drinklist', productsController.drinkList);

module.exports = router;