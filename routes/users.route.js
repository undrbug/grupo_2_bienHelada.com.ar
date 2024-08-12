const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const uploadUser = require('../services/multerUserStorage.js');


router.get("/login", usersController.login);
router.post("/login", usersController.loginCheck);
router.get("/register", usersController.register);
router.post("/add", uploadUser.single('image'), usersController.newRegister);

router.get("/recuperarpassword", usersController.recuperarPassword);
router.get("/restablecerpasword", usersController.restablecerPassword);

module.exports = router;

//routes para users