

const transactionController = {}
transactionController.get = (req,res,next)=>{
    res.render('transaction');
};

module.exports = transactionController;