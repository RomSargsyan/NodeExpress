const {Router} = require('express');

const route = Router();

route.get('/', (req, res) => {
    res.render('index', {
        title: 'Home page',
        isHome: true
    })
});

module.exports = route;