const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const uploadUser = require('../services/multerUserStorage.js');
const { body } = require('express-validator');

const validationsLogin = [
    body('email').isEmail().bail().withMessage('Ingrese un email valido').bail()
        .notEmpty().withMessage('El email es obligatorio'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria').bail()
    .isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres')
];
const validationsRegister = [
    body('firstName').notEmpty().withMessage('El nombre es obligatorio'),
    body('lastName').notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().bail().withMessage('Ingresa un email valido').bail()
        .notEmpty().withMessage('El email es obligatorio'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria').bail()
    .isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres'),
    body('rePassword').notEmpty().withMessage('La contraseña es obligatoria').bail()
    .isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres'),
    body('rePassword').custom((value, { req }) => {
        if (req.body.password !== req.body.rePassword) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    body('image').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('La imagen es obligatoria');
        }
        return true;
    })
];

router.get("/login", usersController.login);
router.post("/login", validationsLogin, usersController.loginCheck);
router.get("/register", usersController.register);
router.post("/add", uploadUser.single('image'), validationsRegister, usersController.newRegister);

router.get("/recuperarpassword", usersController.recuperarPassword);
router.get("/restablecerpasword", usersController.restablecerPassword);

module.exports = router;

//routes para users