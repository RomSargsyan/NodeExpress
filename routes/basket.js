const { Router } = require('express');

const Basket = require('../models/basket')
const Courses = require('../models/courses')

const route = Router();

route.get('/', async (req, res) => {
    const basket = await Basket.fetch();

    res.render('basket', {
        title: 'basket',
        isCard: true,
        courses: basket.courses,
        price: basket.price
    })
})

route.post('/', async (req, res) => {
    const basket = await Basket.add(req.body.id);

    res.redirect('/basket')
})


route.delete('/remove/:id', async (req, res) => {
    const basket = await Basket.remove(req.params.id);
    res.status(200).json(basket) 
})


module.exports = route;