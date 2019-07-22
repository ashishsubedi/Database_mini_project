const express = require('express');
const router = express.Router();

const indexController = require('../controller/indexController');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', indexController.get);
module.exports = router;