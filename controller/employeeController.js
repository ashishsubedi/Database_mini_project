const crypto = require('crypto');

const con = require('../database/connection')

const employeeController = {}
employeeController.login = (req,res,next)=>{
    const email = req.body.employeeEmail;
    const password = req.body.employeePassword;
    let hash = crypto.createHash('md5').update(password).digest('hex');

    //Verify in database
    con.query("SELECT password FROM employee WHERE emailAdd = ?",[email],(err,result)=>{
        if(err) throw err;

        if(result.length > 0){
            console.log(result)
            if(hash == result[0].password){
                console.log("Password Correct")
                res.cookie("employee", '63a9f0ea7bb98050796b649e85481845', {maxAge: 604800000})
                res.render('transaction');
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

employeeController.logout = (req,res,next) =>{
    res.clearCookie('employee');
    res.redirect('/');
}
employeeController.get = (req,res,next)=>{
    res.render('transaction');
}


module.exports = employeeController;