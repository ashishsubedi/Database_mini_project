

const adminController = {}
adminController.getDashboard = (req,res,next)=>{
    res.render('adminDashboard');
};

module.exports = adminController;