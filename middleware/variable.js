module.exports = function(req, res, next) {
    res.locals.isAuth = req.session.isAuthentication;
    res.locals.csrf = req.csrfToken();
    next();
}