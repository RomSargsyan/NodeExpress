exports.homeGet = (req, res) => {
    res.render('index', {
        title: 'Home page',
        isHome: true
    })
};