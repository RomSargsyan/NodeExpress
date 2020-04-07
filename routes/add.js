const { Router } = require('express');
const { validationResult } = require('express-validator');

const auth = require('./../middleware/auth');
const Courses = require('../models/courses');
const { coursesValidator } = require('../utils/validator');

const route = Router();

route.get('/', auth, (req, res) => {
    res.render('courses/add', {
        title: 'Add Courses',
        isAdd: true,
        error: req.flash('error'),
        data: {
            title: req.body.title,
            price: req.body.price,
            img: req.body.img,
        }
    })
});

route.post('/', auth, coursesValidator, async (req, res) => {
    try {
        const courses = await new Courses({
            title: req.body.title,
            price: req.body.price,
            img: req.body.img,
            userId: req.user._id
        })
            
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('error', errors.array()[0].msg)
            return res.status(422).redirect('/add')
        }
        
        await courses.save();
        res.redirect('/courses')
    } catch (err) {
        console.log(err);
    }
})

module.exports = route;