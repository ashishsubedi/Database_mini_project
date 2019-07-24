
const crypto = require('crypto');
const con = require('../database/connection')


const adminController = {}


adminController.login = (req, res, next) => {
    const email = req.body.adminEmail;
    const password = req.body.adminPassword;
    let hash = crypto.createHash('md5').update(password).digest('hex');
    console.log(hash)

    con.query("SELECT email, password FROM admin WHERE email = ?", [email], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            console.log(result)
            if (hash == result[0].password) {
                console.log("Password Correct")
                res.cookie("hash", '63a9f0ea7bb98050796b649e85481845', { maxAge: 604800000 })
                res.redirect('/admin');
            } else {
                console.log("Password InCorrect")

                res.redirect('/');
            }
        }
        else {
            console.log("Email InCorrect")

            res.redirect('/');
        }
    })


};

adminController.logout = (req, res, next) => {
    res.clearCookie('hash');
    res.redirect('/');
}

adminController.getProductPage = (req, res, next) => {
    query = "SELECT * from `product`";
    con.query(query, [], (err, result2) => {
        if (err) throw err;
        // res.json(result2);
        console.log(result2)
        res.render('products', {
            result: result2
        })
    })
}

adminController.getAddProductPage = (req, res, next) => {
    query = "SELECT * from `category`";
    con.query(query, [], (err, result) => {
        if (err) throw err;

        query = "SELECT * from `brand`";
        con.query(query, [], (err, result2) => {
            if (err) throw err;

            console.log(result, result2)
            // res.json(result2);
            res.render('addProduct', {
                category: result,
                brand: result2
            })
        })

    })
}

adminController.addProduct = (req, res, next) => {
    const { productId, name, numInStock, price, category, brandId } = req.body;
    console.log(productId, name, numInStock, price, category, brandId);
    let query = "INSERT INTO `product` VALUES (?,?,?,?,?,?)";
    con.query(query, [productId, name, numInStock, category, brandId, price], (err, result) => {
        if (err) throw err;
        query = "SELECT * from `product`";
        con.query(query, [], (err, result2) => {
            if (err) throw err;
            // res.json(result2);
            console.log(result2)
            res.render('products', {
                result: result2
            })
        })


    })

}

adminController.deleteProduct = (req, res, next) => {
    const productId = req.params.id;

    let query = "DELETE FROM `product` WHERE product_id = ?";
    con.query(query, [productId], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/admin/products');


    })

}


adminController.getEmployeePage = (req, res, next) => {
    query = "SELECT * FROM employee INNER JOIN store ON employee.storeID = store.store_id INNER JOIN `job` ON employee.designation = job.designation";
    con.query(query, [], (err, result) => {
        if (err) throw err;

        // res.json(result2);
        console.log("RESULRT: ", result)
        res.render('adminDashboard', {
            result: result
        });


    })
}

adminController.getAddEmployeePage = (req, res, next) => {
    query = "SELECT * from `store`";
    con.query(query, [], (err, result) => {
        if (err) throw err;

        query = "SELECT * from `job`";
        con.query(query, [], (err, result2) => {
            if (err) throw err;

            console.log(result, result2)
            // res.json(result2);
            res.render('addEmployee', {
                store: result,
                job: result2
            })
        })

    })
}

adminController.addEmployee = (req, res, next) => {
    const { emp_id, fname, lname, contactnum, joiningDate, birthdate, storeID, designation, emailAdd, password } = req.body;
    console.log(emp_id, fname, lname, contactnum, joiningDate, birthdate, storeID, designation, emailAdd, password);
    let query = "INSERT INTO `employee` VALUES (?,?,?,?,?,?,?,?,?,?)";
    con.query(query, [emp_id, fname, lname, contactnum, joiningDate, birthdate, storeID, designation, emailAdd, password], (err, result) => {
        if (err) throw err;
        res.redirect('/admin/employees');


    })

}

adminController.deleteEmployee = (req, res, next) => {
    const productId = req.params.id;

    let query = "DELETE FROM `product` WHERE product_id = ?";
    con.query(query, [productId], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/admin/products');


    })

}
module.exports = adminController;