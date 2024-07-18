const router = require('express').Router();
const productsController = require('./products.controller');

const productsController = {
    products: (req, res) => {
        res.render('products/products.ejs', {title: 'Products'});
    },
    productCart: (req, res) => {
        res.render('products/productCart.ejs', {title: 'Product Cart'});
    },
    productDetail: (req, res) => {
        res.render('products/productDetail.ejs', {title: 'Product Detail'});
    }
}

module.exports = productsController;

//controllers para products