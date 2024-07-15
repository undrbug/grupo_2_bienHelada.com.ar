const express = require('express');
const path = require('path');
const app = express();

const mainController = {
    home: (req, res) => {
        res.render('home.ejs');
    },
    index: (req, res) => {
        res.render('index.ejs');
    },
    login: (req, res) => {
        res.render('login.ejs');
    },
    registro: (req, res) => {
        res.render('registro.ejs');
    },
    register: (req, res) => {
        res.render('register.ejs');
    },
    productCart: (req, res) => {
        res.render('productCart.ejs');
    },
    detalleProducto: (req, res) => {
        res.render('detalleProducto.ejs');
    },
    productDetail: (req, res) => {
        res.render('productDetail.ejs');
    },
    recuperarPassword: (req, res) => {
        res.render('recuperarPassword.ejs');
    },
    restablecerPassword: (req, res) => {
        res.render('restablecerPassword.ejs');
    }
};

module.exports = mainController;

// app.get("/", function(req, res) {
//     res.sendFile(path.resolve("views/home.html"))
// })

// app.get("/login", function(req, res) {
//     res.sendFile(path.resolve("views/login.html"))
// })
// app.get("/registro", function(req, res) {
//     res.sendFile(path.resolve("views/registro.html"))
// })
// app.get("/productcart", function(req, res) {
//     res.sendFile(path.resolve("views/productCart.html"))
// })
// app.get("/detalleproducto", function(req, res) {
//     res.sendFile(path.resolve("views/detalleProducto.html"))
// })
// app.get("/recuperarPassword.html", function(req, res) {
//     res.sendFile(path.resolve("views/recuperarPassword.html"))
// })
// app.get("/restablecerPassword.html", function(req, res) {
//     res.sendFile(path.resolve("views//restablecerPassword.html"))
// })