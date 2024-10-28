const router = require('express').Router();
const contactController = require('../controllers/contact.controller.js');

router.get('/', contactController.contact);

router.post('/send-mail', contactController.sendMail);

module.exports = router;