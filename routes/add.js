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