const express = require('express');
const router = express.Router();

//PASSWORD is employee

const employeeLogin = require('../middlewares/employeeLogin');
// Require the controllers WHICH WE DID NOT CREATE YET!!
const employeeController = require('../controller/employeeController');


// a simple test url to check that all of our files are communicating correctly.

router.post('/login',employeeController.login);
router.get('/',employeeLogin, employeeController.get);
router.get('/logout',employeeLogin, employeeController.logout);


router.post('/addToList', employeeController.addToList);
router.post('/handleSale', employeeController.handleSale);
router.post('/reset',employeeController.reset);



module.exports = router;