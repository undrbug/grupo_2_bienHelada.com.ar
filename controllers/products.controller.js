const router = require('express').Router();

const productsController = {
    products: (req, res) => {
        res.render('products/products.ejs', {title: 'Products'});
    },
    productCart: (req, res) => {
        res.render('products/productCart.ejs', {title: 'Product Cart'});
    },
    productDetail: (req, res) => {
        res.render('products/productDetail.ejs', {title: 'Product Detail'});
    },
    productAdd: (req, res) => {
        res.render('products/productAdd.ejs', {title: 'Alta producto'});
    },
    productDel: (req, res) => {
        // const {id} = req.params;
        res.render('products/productDel.ejs', {title: 'Eliminar producto'});
    },
    productMod: (req, res) => {
        // const {id} = req.params;
        res.render('products/productMod.ejs', {title: 'Modificar producto'});
    }
}

module.exports = productsController;

//controllers para products