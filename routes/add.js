const { Router } = require('express');

const add = require('../controllers/add');
const auth = require('./../middleware/auth');
const { coursesValidator } = require('../utils/validator');

const route = Router();

route.get('/', auth, add.addGet);
route.post('/', auth, coursesValidator, add.addPost)

module.exports = route;