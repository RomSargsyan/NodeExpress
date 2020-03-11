const {Router} = require('express');

const route = Router();

route.get('/', (req, res) => {
    res.render('courses', {
        title: 'Courses',
        isCourses: true
    })
});

module.exports = route;