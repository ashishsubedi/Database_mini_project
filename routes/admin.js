const express = require('express');
const router = express.Router();

adminLogin = require('../middlewares/adminLogin');


// Require the controllers WHICH WE DID NOT CREATE YET!!
const adminController = require('../controller/adminController');


// a simple test url to check that all of our files are communicating correctly.
router.get('/',adminLogin, adminController.getDashboard);
router.post('/login',adminController.login)
router.get('/logout',adminLogin,adminController.logout)
router.get('/products',adminLogin,adminController.getProductPage)
module.exports = router;