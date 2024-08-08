const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const data = require('../data/wines.json');
const services = require("../services/dataSource.js");



const mainController = {
    home: (req, res) => {
        const wineList = services.load();
        // res.send(wineList);
        res.render('index.ejs',{title: "Bien-Heladas wines&drinks", wineList: wineList});
    }
};

module.exports = mainController;