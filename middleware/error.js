module.exports = function(req, res ,next) {
    return res.status(404).render('error/404', {
        title: 'Page not found',
    })
}  