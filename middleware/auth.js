module.exports = function (req, res, next) {
    if (!req.session.isAuthentication) {
        return res.redirect('/auth/login#login')
    }

    next()
}