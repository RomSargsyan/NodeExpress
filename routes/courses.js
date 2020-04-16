const { Router } = require('express');
const auth = require('./../middleware/auth');
const courses = require('../controllers/courses');

const route = Router();

route.get('/', courses.coursesGet);
route.get('/:id', courses.courseGet);
route.get('/:id/edit', auth, courses.editGet);

route.post('/', auth, courses.coursePost);
route.post('/remove', auth, courses.removePost);

module.exports = route;