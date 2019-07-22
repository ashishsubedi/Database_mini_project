const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const adminController = require('../controller/adminController');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', adminController.getDashboard);
module.exports = router;