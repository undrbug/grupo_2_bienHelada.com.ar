const router = require('express').Router();
const mainController = require('../controllers/main.controller.js');

router.get('/', mainController.home);

module.exports = router;
