const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');


router.get("/login", usersController.login);
router.get("/register", usersController.register);
router.get("/recuperarpassword", usersController.recuperarPassword);
router.get("/restablecerpasword", usersController.restablecerPassword);

module.exports = router;

//rutas para usuarios
