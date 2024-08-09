const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const services = require("../services/dataUsers.js");


const usersController = {
    login: (req, res) => {
        res.render('users/login.ejs', {title: 'Login'});
    },
    register: (req, res) => {
        res.render('users/register.ejs', {title: 'Register'});
    },
    newRegister: (req, res) => {
        try {
            // Asigna la imagen del usuario o una imagen por defecto si no se sube ninguna
            const imgUser = req.file
                ? `/images/users/${req.file.filename}`
                : "/images/users/default.png";
                console.log(req.body);
            // Accede a los campos del formulario desde req.body
            const { firstName, lastName, email, password } = req.body;
    
            // Carga los usuarios existentes
            let users = services.load();
    
            // Crea un nuevo usuario con todos los campos
            const newUser = {
                id: users.length + 1,
                firstName: firstName,
                lastName: lastName,
                email: email,
                image: imgUser,
                password: password,
            };
    
            // Agrega el nuevo usuario a la lista de usuarios y guarda los cambios
            users.push(newUser);
            services.save(users);
    
            // Redirige a la página principal después de guardar
            res.redirect("/");
        } catch (error) {
            console.log(error);
            res.status(500).send("Error al registrar el usuario");
        }
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