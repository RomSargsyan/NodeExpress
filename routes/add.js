const {Router} = require('express');
const auth = require('./../middleware/auth');
const Courses = require('../models/courses');

const route = Router();

route.get('/', auth, (req, res) => {
    res.render('add', {
        title: 'Add Courses',
        isAdd: true
    })
});

route.post('/', auth, async (req, res) => {
    const courses = await new Courses({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user._id
    })

    try {
        await courses.save();
        res.redirect('/courses')    
    } catch (err) {
        console.log(err);
        
    }
    
})

module.exports = route;