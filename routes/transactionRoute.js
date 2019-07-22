const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const transactionController = require('../controller/transactionController');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', transactionController.get);
module.exports = router;