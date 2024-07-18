const express = require('express');
const path = require('path');
const app = express();

const mainController = {
    home: (req, res) => {
        res.render('index.ejs',{title: 'Bien-Heladas wines&drinks'});
    },
    product: (req, res) => {
        res.render('products/products.ejs', {title: 'Product'}); 
    },
    productCart: (req, res) => {
        res.render('products/productCart.ejs', {title: 'Product Cart'});
    },
    productDetail: (req, res) => {
        res.render('products/productDetail.ejs', {title: 'Product Detail'});
    }, 
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
};

module.exports = mainController;