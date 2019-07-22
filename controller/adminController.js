
const crypto = require('crypto');
const con = require('../database/connection')


const adminController = {}
adminController.getDashboard = (req,res,next)=>{
    res.render('adminDashboard');
};

adminController.login = (req,res,next)=>{
    const email = req.body.adminEmail;
    const password = req.body.adminPassword;
    let hash = crypto.createHash('md5').update(password).digest('hex');
    console.log(hash)

    con.query("SELECT email, password FROM admin WHERE email = ?",[email],(err,result)=>{
        if(err) throw err;

        if(result.length > 0){
            console.log(result)
            if(hash == result[0].password){
                console.log("Password Correct")
                res.cookie("hash", '63a9f0ea7bb98050796b649e85481845', {maxAge: 604800000})
                res.redirect('/admin');
            }else{
                console.log("Password InCorrect")

                res.redirect('/');
            }
        }
        else{
            console.log("Email InCorrect")

            res.redirect('/');
        }
    })
    

};

adminController.logout = (req,res,next) =>{
    res.clearCookie('hash');
    res.redirect('/');
}

adminController.getProductPage = (req,res,next)=>{
    res.render('products.ejs');
}
module.exports = adminController;