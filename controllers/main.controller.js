const express = require('express');
const path = require('path');
const app = express();

const mainController = {
    home: (req, res) => {
        res.render('index.ejs',{title: 'Bien-Heladas wines&drinks'});
    }
};

module.exports = mainController;