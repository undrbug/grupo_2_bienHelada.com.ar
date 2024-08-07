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
            //si no viene imagen se carga una por defecto
            const image = req.file
            ? `./images/products/${req.file.filename}`
            : "/image/products/default.png";
            const {name, price, description, bodega, varietal, category, cantidad} = req.body;
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
                "imagen": imagen
            }
            products.push(newProduct);
            services.save(products);
            console.log("okas");
            res.redirect('/products');
        } catch (error) {
            console.log(error);
        }
    },
    productDel: (req, res) => {
        const {id} = req.params;
        let products = services.load();
        productToDelete = products.find(product => product.id == +id);
           // Obtener la ruta completa de la imagen
           const imagePath = path.join(__dirname, `../public/images/products/${productToDelete.imagen}`);
           // Eliminar la imagen físicamente
           fs.unlink(imagePath, (err) => {
               if (err) {
                   console.error("Error al eliminar la imagen:", err);
               } else {
                   console.log("Imagen eliminada con éxito");
               }
           });
        products = products.filter(product => product.id !== +id);
        services.save(products);
        console.log("Producto eliminado con éxito");
        res.render('index.ejs',{title: "Bien-Heladas wines&drinks", wineList: products});
    },
    //Editar Producto con ID
    productModView: (req, res) => {
        const { id } = req.params;
        const wines = services.load();
    
        // Asegúrate de que id es un número entero
        const wine = wines.find(wine => wine.id === +id);
    
        if (!wine) {
            return res.status(404).send('Producto no encontrado');
        }
    
        res.render('products/productMod.ejs', { title: 'Product Edit', wine: wine });
    },


    productMod: (req, res) => {
        let image = "";
        if (req.file && req.file.filename) {
            image = `./images/products/${req.file.filename}`;
        } else {
            image = req.body.existingImage;
        }
    
        const { id } = req.params;
        const { name, price, description, bodega, varietal, category, cantidad } = req.body;
    
        // Convertir el ID a número
        const numericId = +id;
    
        let modWines = services.load().map((wine) =>
            wine.id === numericId
                ? {
                    "id": numericId,
                    "nombre": name,
                    "descripcion": description,
                    "imagen": image,
                    "precio": price,
                    "bodega": bodega,
                    "categoria": category,
                    "varietal": varietal,
                    "cantidad": cantidad
                }
                : wine
        );
    
        services.save(modWines);
    
        res.redirect(`/products/productdetail/${numericId}`);
    }
}

module.exports = productsController;

//controllers para products