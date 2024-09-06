const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const data = require('../data/wines.json');
const services = require("../services/dataSource.js");
let db = require('../database/models');



const mainController = {
    home: (req, res) => {

    
    db.Products.findAll()
    .then(function(wineList) {        
        res.render('index.ejs',{title: "Bien-Heladas wines&drinks", wineList: wineList});
    })
    .catch(function(error) {
        // Manejo de errores
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener la lista de productos.');
    });

}
};

module.exports = mainController;