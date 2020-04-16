const { Router } = require('express');
const auth = require('./../middleware/auth');
const orders = require('../controllers/orders');

const router = Router();

router.get('/', auth, orders.ordersGet);
router.post('/', auth, orders.ordersPost);

module.exports = router;