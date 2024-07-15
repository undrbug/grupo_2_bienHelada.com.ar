const router = require('express').Router();
const mainController = require('../controllers/main.controller.js');

router.get('/', mainController.home);
router.get('/index', mainController.index);
router.get('/login', mainController.login);
router.get('/registro', mainController.registro);
router.get('/register', mainController.register);
router.get('/productcart', mainController.productCart);
router.get('/detalleproducto', mainController.detalleProducto);
router.get('/productdetail', mainController.productDetail);
router.get('/recuperarpassword', mainController.recuperarPassword);
router.get('/restablecerpaswword', mainController.restablecerPassword);


module.exports = router;
