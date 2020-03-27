const {Router} = require('express');
const Courses = require('../models/courses')

const route = Router();

route.get('/', (req, res) => {
    res.render('add', {
        title: 'Add Courses',
        isAdd: true
    })
});

route.post('/', async (req, res) => {
    const courses = await new Courses(req.body.title, req.body.price, req.body.imgURL )
    courses.save();

    res.redirect('/courses')
})

module.exports = route;