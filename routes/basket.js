const { Router } = require('express');
const auth = require('./../middleware/auth');
const basket = require('../controllers/basket');

const route = Router();

route.get('/', auth, basket.basketGet);
route.post('/', auth, basket.basketPost);
route.delete('/remove/:id', auth, basket.basketDelete);

module.exports = route;