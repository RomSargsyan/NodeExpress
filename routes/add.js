const {Router} = require('express');

const route = Router();

route.get('/', (req, res) => {
    res.render('add', {
        title: 'Add Courses',
        isAdd: true
    })
});

route.post('/', (req, res) => {
    console.log(req.body);

    res.redirect('/courses')
})

module.exports = route;