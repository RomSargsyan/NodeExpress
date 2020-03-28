const {Router} = require('express');
const Courses = require('../models/courses')
const route = Router();

route.get('/', async (req, res) => {
    const courses = await Courses.getAll()
    res.render('courses', {
        title: 'Courses',
        isCourses: true,
        courses
    })
});

route.get('/:id', async (req, res) => {
    const course = await Courses.getCourseById(req.params.id)
    
    res.render('course', {
        layout: 'empty',
        title: `Course ${course.title}` ,
        course
    })
});

route.get('/:id/edit', async (req, res) => {
    const course = await Courses.getCourseById(req.params.id)
    
    if (!req.query.allow) {
        res.redirect('/')
    } else {
        res.render('edit', {
            title: `Edit ${course.title}`,
            course
        } )
    }
})

route.post('/', async (req, res) => {
    const course = await Courses.update(req.body)
    res.redirect('/courses')
})

module.exports = route;