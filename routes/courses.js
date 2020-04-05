const { Router } = require('express');

const Courses = require('../models/courses');
const auth = require('./../middleware/auth');

const route = Router();

route.get('/', async (req, res) => {
    try {
        const courses = await Courses.find()
            .populate('userId', 'email name')
            .select();

        res.render('courses', {
            title: 'Courses',
            isCourses: true,
            courses,
            userId: req.session.user._id
        })
    } catch (err) {
        console.log(err);
    }
});

route.get('/:id', async (req, res) => {
    try {
        const course = await Courses.findById(req.params.id)

        res.render('course', {
            layout: 'empty',
            title: `Course ${course.title}`,
            course
        })
    } catch (err) {
        console.log(err);
    }
});

route.get('/:id/edit', auth, async (req, res) => {
    const course = await Courses.findById(req.params.id)
    
    if (course.userId.toString() !== req.user._id.toString()) {
        res.redirect('/courses')
    } else {
        if (!req.query.allow) {
            res.redirect('/')
        } else {
            res.render('edit', {
                title: `Edit ${course.title}`,
                course
            })
        }
    }
})

route.post('/', auth, async (req, res) => {
    try {
        const { id } = req.body;
        delete req.body.id;
        
        const course = await Courses.findByIdAndUpdate(id, req.body)
        res.redirect('/courses')
    } catch (err) {
        console.log(err);
    }
})

route.post('/remove', auth, async (req, res) => {
    try {
        await Courses.findByIdAndRemove(req.body.id)
        res.redirect('/courses')
    } catch (err) {
        console.log(err);
    }
})

module.exports = route;