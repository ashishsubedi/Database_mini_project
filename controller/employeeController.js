const crypto = require('crypto');
const moment = require('moment');

const con = require('../database/connection')

const employeeController = {}
employeeController.login = (req, res, next) => {
    const email = req.body.employeeEmail;
    const password = req.body.employeePassword;
    let hash = crypto.createHash('md5').update(password).digest('hex');

    //Verify in database
    con.query("SELECT password FROM employee WHERE emailAdd = ?", [email], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            console.log(result)
            if (hash == result[0].password) {
                console.log("Password Correct")
                res.cookie("employee", 'fa5473530e4d1a5a1e1eb53d2fedb10c', { maxAge: 604800000 })
                res.redirect('/employee');
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

employeeController.logout = (req, res, next) => {
    res.clearCookie('employee');
    res.redirect('/');
}
employeeController.get = (req, res, next) => {
    let query = 'SELECT * from employee';
    con.query(query, [], (err, result) => {
        if (err) throw err;
        console.log(result)
        res.render('transaction', {
            result: result[0]
        });
    })
}

employeeController.addToList = (req, res, next) => {
    console.log(req.body);
    //WHICH TABLE WOULD I UPDATE? SHOuld I create new sale?

    const { quantity, productId, saleId } = req.body;
    let query = 'INSERT INTO productList VALUES (?,?,?)';

    con.query(query, [saleId, productId, quantity], (err, result) => {
        if (err) throw err;
        console.log(result);
        query = 'SELECT * FROM productlist INNER JOIN product ON productlist.productID = product.product_id INNER JOIN sale ON sale.sale_id = productlist.saleID WHERE productlist.productID = ? AND saleID= ?';
        con.query(query, [productId,saleId], (err, result2) => {
            console.log("RESULT:",result2)
            res.json({
                result:  result2
            })
        })

    });

}

employeeController.handleSale = (req, res, next) => {
    const { storeId } = req.body;
    const saleId = moment().unix();
    let noOfItemsSold = 0;
    let totalPrice = 0;
    let date = moment().format()
    console.log("StoreID: ", storeId)
    //WHICH TABLE WOULD I UPDATE? SHOuld I create new sale?
    let query = "INSERT INTO sale VALUES (?,?,?,?,?)";
    con.query(query, [saleId, storeId, noOfItemsSold, totalPrice, date], (err, result) => {
        if (err) throw err;
        res.json({
            saleId,
            message: 'Success',
            status: 200
        })

    })

}

employeeController.reset = (req,res,next)=>{
    const {productId,saleId} = req.body;
    let query = 'DELETE FROM productList WHERE productID = ?  and saleID = ?';
    con.query(query,[productId,saleId],(err,result)=>{
        if(err) throw err;
        res.json({
            productId,
            saleId,
            message: 'Success',
            status: 200
        });
    })
}



module.exports = employeeController;