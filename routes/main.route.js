const router = require('express').Router();
const mainController = require('../controllers/main.controller.js');
const guestMiddleware = require('../middlewares/guestMiddleware.js');

router.get('/', mainController.home);

module.exports = router;
