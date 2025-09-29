const express = require('express');
const router = express.Router();
const conctactController = require('../controllers/contactController');


// aquí debes llamar a la función, no al objeto entero
router.post('/', conctactController.sendMessage);

module.exports = router;
