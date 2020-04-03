const {Router} = require('express');

const Courses = require('../models/courses');
const auth = require('./../middleware/auth');

const route = Router();

route.get('/', async (req, res) => {
    const courses = await Courses.find()
        .populate('userId', 'email name')
        .select('title price img');
    res.render('courses', {
        title: 'Courses',
        isCourses: true,
        courses
    })
});

route.get('/:id', async (req, res) => {
    const course = await Courses.findById(req.params.id)
    
    res.render('course', {
        layout: 'empty',
        title: `Course ${course.title}` ,
        course
    })
});

route.get('/:id/edit', auth, async (req, res) => {
    const course = await Courses.findById(req.params.id)
    
    if (!req.query.allow) {
        res.redirect('/')
    } else {
        res.render('edit', {
            title: `Edit ${course.title}`,
            course
        } )
    }
})

route.post('/', auth, async (req, res) => {
    const {id} = req.body;
    delete req.body.id;

    const course = await Courses.findByIdAndUpdate(id, req.body)
    res.redirect('/courses')
})

route.post('/remove', auth, async (req, res) => {
    const course = await Courses.findByIdAndRemove(req.body.id)
    res.redirect('/courses')
})

module.exports = route;