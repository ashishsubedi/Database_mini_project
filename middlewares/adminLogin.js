module.exports = (req, res, next) => {
    if (req.cookies.hash === "63a9f0ea7bb98050796b649e85481845"){
        next();
    } else {
        res.redirect("/");
    }
}