const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const data = require('../data/wines.json');

const winesFilePath = path.join(__dirname, '../data/wines.json');
const winesData = fs.readFileSync(winesFilePath, 'utf-8');
const wineList = JSON.parse(winesData);

const mainController = {
    home: (req, res) => {
        res.render('index.ejs',{title: "Bien-Heladas wines&drinks", wineList: wineList});
    }
};

module.exports = mainController;