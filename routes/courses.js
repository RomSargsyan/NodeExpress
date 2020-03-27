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

module.exports = route;