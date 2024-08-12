const router = require('express').Router();
const productsController = require('../controllers/products.controller.js');
const upload = require('../services/multerProdcutsStorage.js');
const { body } = require('express-validator');

const validationsProducts = [
    body('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('description').notEmpty().withMessage('La descripción del producto es obligatoria'),
    body('category').notEmpty().withMessage('La categoría del producto es obligatoria'),
    body('bodega').notEmpty().withMessage('La bodega del producto es obligatoria'),
    body('varietal').notEmpty().withMessage('El varietal del producto es obligatorio'),
    body('cantidad').notEmpty().withMessage('La cantidad del producto es obligatoria'),
    body('price').notEmpty().withMessage('El precio del producto es obligatorio'),
    body('image').custom((value, { req }) => {
            if (req.file) {
                    return true;
                }
                return false;
            }).withMessage('La imagen del producto es obligatoria')
];

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
router.post('/add', upload.single('image'), validationsProducts, productsController.productAdd);
//Vista para eliminar producto (no se si lo vamos a implementar)
// router.get('/productdel', productsController.productDelView);
//Metodo para eliminar producto
router.delete('/productdel/:id', productsController.productDel);
//Vista para modificar producto
router.get('/productmod/:id', productsController.productModView);
//Metodo para modificar producto con su middleware para cargar imagen
router.put('/productmod/:id', upload.single('image'), productsController.productMod);

module.exports = router;