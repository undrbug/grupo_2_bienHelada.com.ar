const router = require('express').Router();
const mainController = require('../controllers/main.controller.js');

router.get('/', mainController.home);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.get('/productcart', mainController.productCart);
router.get('/productdetail/:id', mainController.productDetail);
router.get('/recuperarpassword', mainController.recuperarPassword);
router.get('/restablecerpasword', mainController.restablecerPassword);


module.exports = router;
