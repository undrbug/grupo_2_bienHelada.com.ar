const express = require('express');
const path = require('path');
const app = express();

const usersController = {
    login: (req, res) => {
        res.render('users/login.ejs', {title: 'Login'});
    },
    register: (req, res) => {
        res.render('users/register.ejs', {title: 'Register'});
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