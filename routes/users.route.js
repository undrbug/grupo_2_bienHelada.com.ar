const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const uploadUser = require('../services/multerUserStorage.js');
const validationsRegister = require('../middlewares/validationsResgister.js');
const validationsLogin = require('../middlewares/validationsLogin.js');
const guestMiddleware = require('../middlewares/guestMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js');


router.get("/login", guestMiddleware, usersController.login);
router.post("/login", validationsLogin, usersController.loginCheck);
router.get("/register", guestMiddleware, usersController.register);
router.post("/add", uploadUser.single('image'), validationsRegister, usersController.newRegister);
router.get('/profile', authMiddleware, usersController.profile);
router.get('/logout', authMiddleware, usersController.logout);

router.get("/recoverpassword", usersController.recoverPassword);
router.post('/sendforgotpasswordemail', usersController.sendForgotPasswordEmail);
router.get("/resetpassword/:token", usersController.resetPassword);
router.post('/updatepassword/:id', usersController.updatePassword);

module.exports = router;