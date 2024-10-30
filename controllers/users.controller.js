const bcrypt = require('bcryptjs');
const dataCountries = require("../services/dataCountries.js");
const {validationResult} = require('express-validator');
const db = require('../database/models/index.js');
const servicesDB = require('../services/services_db.js');
const contactController = require('../controllers/contact.controller.js');
const { v4: uuidv4 } = require('uuid');

const usersController = {
    //renderizamos la vista de login
    login: (req, res) => {
        res.render('users/login.ejs', {title: 'Login'});
    },
    //validamos los datos del login
    loginCheck: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("users/login.ejs", {
                title: "Login",
                errors: errors.mapped(),
                oldData: req.body,
            });
            // res.send(errors.mapped());
        }
        
        try {
            const user = await servicesDB.getByEmail(req.body.email);
            if (user) {
                const errors =[];
                const passwordMatch = bcrypt.compareSync(req.body.password, user.HashPassword);
                if (passwordMatch) {
                    delete user.password;
                    req.session.userLogged = user;
                    if (req.body.rememberMe) {
                        res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 });
                    }
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
            
        } catch (error) {
            console.log("Error al buscar el usuario", error.message);
        }

    },
    register: async (req, res) => {
        try {
            const statesResponse = dataCountries.getProvinciasJson();
            const listaProvincias = await statesResponse;
            const listaPaises = [{
                nombre: "Argentina",
            }];
            res.render('users/register.ejs', {title: 'Register', listaPaises, listaProvincias});
            // res.json({listaPaises});
        } catch (error) {
            console.log(`Error al traer lista de paises: ${error.message}`);
            res.render('users/register.ejs', { title: 'Register', listaPaises: [], listaProvincias: [] });
        }
    },
    newRegister: async (req, res) => {
        const errors = validationResult(req);
        const listaProvincias = await dataCountries.getProvinciasJson();
        const listaPaises = [{ nombre: "Argentina" }];

        if (!errors.isEmpty()) {
            return res.render("users/register.ejs", {
                title: "Register",
                errors: errors.mapped(),
                oldData: req.body,
                listaPaises,
                listaProvincias
            });
        }
        try {
            // Asigna la imagen del usuario o una imagen por defecto si no se sube ninguna
            const imgUser = req.file
                ? `/images/users/${req.file.filename}`
                : "/images/users/default.png";
            // Accede a los campos del formulario desde req.body
            const { firstName, lastName, email, phone, adress, country, state, password } = req.body;
            console.log(imgUser);
            if (await db.Customer.findOne({ where: { email: email } })) {
                return res.render("users/register.ejs", {
                    title: "Register",
                    errors: {
                        email: {
                            msg: "El email ya está registrado",
                        },
                    },
                    oldData: req.body,
                    listaPaises,
                    listaProvincias
                });
            }
    
            //Encriptamos la contraseña
            let HashPassword = bcrypt.hashSync(password, 10);
            console.log(HashPassword);
            // Crea un nuevo usuario con todos los campos
            const newUser = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                image: imgUser,
                phone: phone,
                adress: adress,
                country: country,
                state: state,
                HashPassword: HashPassword,
                isAdmin: 0,
                isActive: 1,
                verified: 1,
            };
    
            // Agrega el nuevo usuario a la DB de usuarios
            db.Customer.create(newUser);
    
            // Redirige a la página principal después de guardar
            res.redirect("/users/login");
        } catch (error) {
            console.log(`Error al registrar el usuario: ${error.message}`);
            res.status(500).send("Error al registrar el usuario");
        }
    },
    profile: (req, res) => {
        res.render('users/profile.ejs', {title: 'Profile'});
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("userEmail");
        res.redirect('/');
    },
    recuperarPassword: (req, res) => {
        res.render('users/recuperarPassword.ejs', {title: 'Recuperar Password'});
    },
    restablecerPassword: (req, res) => {
        res.render('users/restablecerPassword.ejs', {title: 'Restablecer Password'});
    },
    sendForgotPasswordEmail: async (req, res) => {
        const { email } = req.body;
        const user = await servicesDB.getByEmail(email);
        if (user) {
            const token = uuidv4();
            // await servicesDB.saveToken(token, user.id);
            const messageHtml = `<h2>Recuperación de contraseña</h2>
            <h4>Has solicitado recuperar tu contraseña.</h4>
            <p>Para recuperar tu contraseña, haz click en el siguiente enlace:</p>
            <a href="${process.env.URL}/users/reset-password/${token}">Recuperar contraseña</a>`;
            contactController.sendEmail(email, "Recuperación de contraseña", messageHtml);
            res.redirect("/");
        } else {
            res.render('users/recuperarPassword.ejs', {title: 'Recuperar Password', error: "El email no está registrado"});
            // res.send("El email no está registrado");
        }
    }
}

module.exports = usersController;