const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const uploadUser = require('../services/multerUserStorage.js');
const validationsRegister = require('../middlewares/validationsResgister.js');
const validationsLogin = require('../middlewares/validationsLogin.js');
const guestMiddleware = require('../middlewares/guestMiddleware.js');

router.get("/login", guestMiddleware, usersController.login);
router.post("/login", validationsLogin, usersController.loginCheck);
router.get("/register", guestMiddleware, usersController.register);
router.post("/add", uploadUser.single('image'), validationsRegister, usersController.newRegister);
router.get('/profile', usersController.profile);
router.get('/logout', usersController.logout);

//falta implementar validaciones!
router.get("/recuperarpassword", usersController.recuperarPassword);
router.get("/restablecerpasword", usersController.restablecerPassword);

module.exports = router;