const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const services = require('../services/dataSource.js');
// const data = require('../data/wines.json');

// const winesFilePath = path.join(__dirname, '../data/wines.json');
// const winesData = fs.readFileSync(winesFilePath, 'utf-8');
// const wineList = JSON.parse(winesData);



const productsController = {
    getAllProducts: (req, res) => {
        const wineList = services.load();
        res.render('products/products.ejs', {title: 'Product Cart', wineList});
    },
    productCart: (req, res) => {
        res.render('products/productCart.ejs', {title: 'Product Cart'});
    },
    productDetail: (req, res) => {
        const {id} = req.params;
        const wineList = services.load();
        // +id convierte el id (que puede ser un string) a un número
        const wine = wineList.find(wine => wine.id === +id);
        res.render('products/productDetail.ejs', {title: 'Product Detail', wine: wine});
    },
    productAddView: (req, res) => {
        res.render('products/productAdd.ejs', {title: 'Alta producto'});
    },
    productAdd: (req, res) => {
        try {
            const avatar = (req.file) ? req.file.filename : 'sinImagen.webp';
            console.log(avatar);
            const {name, price, description, bodega, varietal, category, cantidad} = req.body;
            // let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/wines.json'), 'utf-8'));
            let products = services.load();
            const newProduct = {
                "id": products.length + 1,
                "nombre": name,
                "descripcion": description,
                "precio": price,
                "bodega": bodega,
                "categoria": category,
                "varietal": varietal,
                "cantidad": cantidad,
                "imagen": avatar
            }
            products.push(newProduct);
            // fs.writeFileSync(path.resolve(__dirname, '../data/wines.json'), JSON.stringify(products, null, ' '));
            services.save(products);
            console.log("okas");
            // res.redirect('/products');
            res.send(products)
        } catch (error) {
            console.log(error);
        }
    },
    productDel: (req, res) => {
        const {id} = req.params;
        let products = services.load();
        products = products.filter(product => product.id !== +id);
        services.save(products);
        res.render('index.ejs',{title: "Bien-Heladas wines&drinks", wineList: products});
    },
    productMod: (req, res) => {
        // const {id} = req.params;
        res.render('products/productMod.ejs', {title: 'Modificar producto'});
    }
}

module.exports = productsController;

//controllers para products