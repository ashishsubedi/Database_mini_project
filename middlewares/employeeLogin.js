module.exports = (req, res, next) => {
    if (req.cookies.employee === "fa5473530e4d1a5a1e1eb53d2fedb10c"){
        next();
    } else {
        res.redirect("/");
    }
}