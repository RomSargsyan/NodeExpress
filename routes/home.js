const {Router} = require('express');
const home = require('../controllers/home');
const route = Router();

route.get('/', home.homeGet);

module.exports = route;