const express = require('express');
const router = express.Router();

adminLogin = require('../middlewares/adminLogin');


// Require the controllers WHICH WE DID NOT CREATE YET!!
const adminController = require('../controller/adminController');


// a simple test url to check that all of our files are communicating correctly.
router.get('/',adminLogin, adminController.getEmployeePage);
router.post('/login',adminController.login)
router.get('/logout',adminLogin,adminController.logout)


router.get('/products',adminLogin,adminController.getProductPage)
router.get('/products/add',adminController.getAddProductPage)
router.post('/products/add',adminController.addProduct)
router.post('/products/delete/:id',adminController.deleteProduct)


router.get('/employees',adminLogin,adminController.getEmployeePage)
router.get('/employees/add',adminController.getAddEmployeePage)

module.exports = router;