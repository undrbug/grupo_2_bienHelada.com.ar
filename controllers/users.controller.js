const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const services = require("../services/dataUsers.js");
const bcrypt = require('bcryptjs');
const dataUsers = require("../services/dataUsers.js");
const {validationResult} = require('express-validator');
const { use } = require("../routes/users.route.js");

const usersController = {
    login: (req, res) => {
        res.render('users/login.ejs', {title: 'Login'});
    },
    loginCheck: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("users/login.ejs", {
                title: "Login",
                errors: errors.mapped(),
                oldData: req.body,
            });
            // res.send(errors.mapped());
        }
        
        const user = dataUsers.findByEmail(req.body.email);
        if (user) {
            const errors =[];
            const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
            if (passwordMatch) {
                //Redireccionar a la home o a la página de perfil en caso de éxito y muestre
                //los datos del usuario en algún lugar del sitio, como el header.
                // res.send(`user ${user.firstName} ${user.lastName} logged in`);
                delete user.password;
                req.session.userLogged = user;
                console.log(req.session.userLogged);
                res.redirect('/');

            } else {
                //Redireccione nuevamente al login en caso de error.
                return res.render("users/login.ejs", {
                    title: "Login",
                    errors: {
                        password: {
                            msg: "Las credenciales son inválidas",
                        },
                    },
                    oldData: req.body,
                });
            }
        }else {
            //Redireccione nuevamente al login en caso de error.
            return res.render("users/login.ejs", {
                title: "Login",
                errors: {
                    "email": {
                            "msg": "El email no está registrado",
                        }
                    },
                oldData: req.body,
            });
        }
    },
    register: (req, res) => {
        res.render('users/register.ejs', {title: 'Register'});
    },
    newRegister: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("users/register.ejs", {
                title: "Register",
                errors: errors.mapped(),
                oldData: req.body,
            });
        }
        try {
            // Asigna la imagen del usuario o una imagen por defecto si no se sube ninguna
            const imgUser = req.file
                ? `/images/users/${req.file.filename}`
                : "/images/users/default.png";
            // Accede a los campos del formulario desde req.body
            const { firstName, lastName, email, password } = req.body;
            
            if (services.findByEmail(email)) {
                return res.render("users/register.ejs", {
                    title: "Register",
                    errors: {
                        email: {
                            msg: "El email ya está registrado",
                        },
                    },
                    oldData: req.body,
                });
            }
    
            // Carga los usuarios existentes
            let users = services.load();
            //Encriptamos la contraseña
            let passwordEnc = bcrypt.hashSync(password, 10);
            // Crea un nuevo usuario con todos los campos
            const newUser = {
                id: users.length + 1,
                firstName: firstName,
                lastName: lastName,
                email: email,
                image: imgUser,
                password: passwordEnc,
            };
    
            // Agrega el nuevo usuario a la lista de usuarios y guarda los cambios
            users.push(newUser);
            services.save(users);
    
            // Redirige a la página principal después de guardar
            res.redirect("/users/login");
        } catch (error) {
            console.log(error);
            res.status(500).send("Error al registrar el usuario");
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    },
    recuperarPassword: (req, res) => {
        res.render('users/recuperarPassword.ejs', {title: 'Recuperar Password'});
    },
    restablecerPassword: (req, res) => {
        res.render('users/restablecerPassword.ejs', {title: 'Restablecer Password'});
    }
}

module.exports = usersController;


//controllers para users