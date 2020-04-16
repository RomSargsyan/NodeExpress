const { validationResult } = require('express-validator');
const Courses = require('../models/courses');


exports.addGet = (req, res) => {
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
}

exports.addPost  = async (req, res) => {
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
}
