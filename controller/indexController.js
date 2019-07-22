

const indexController = {}
indexController.get = (req,res,next)=>{
    res.render('index');
};

module.exports = indexController;