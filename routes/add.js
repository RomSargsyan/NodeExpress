const {Router} = require('express');

const route = Router();

route.get('/', (req, res) => {
    res.render('add', {
        title: 'Add Courses',
        isAdd: true
    })
});

module.exports = route;