const express = require('express');
const path = require('path');
const app = express();

const mainController = {
    home: (req, res) => {
        res.render('index.ejs',{title: 'Bien-Heladas wines&drinks'});
    },
    login: (req, res) => {
        res.render('users/login.ejs', {title: 'Login'});
    },
    register: (req, res) => {
        res.render('users/register.ejs', {title: 'Register'});
    },
    productCart: (req, res) => {
        res.render('products/productCart.ejs', {title: 'Product Cart'});
    },
    productDetail: (req, res) => {
        res.render('products/productDetail.ejs', {title: 'Product Detail'});
    },
    recuperarPassword: (req, res) => {
        res.render('users/recuperarPassword.ejs', {title: 'Recuperar Password'});
    },
    restablecerPassword: (req, res) => {
        res.render('users/restablecerPassword.ejs', {title: 'Restablecer Password'});
    }
};

module.exports = mainController;