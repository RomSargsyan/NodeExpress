const { Router } = require('express');
const auth = require('../controllers/auth');
const { regValidator } = require('../utils/validator');

const router = Router();

router.get('/login', auth.loginGet);
router.get('/logout', auth.logoutGet);
router.get('/reset', auth.resetGet);
router.get('/password/:token', auth.passwordGet);

router.post('/login', auth.passwordPost)
router.post('/register', regValidator, auth.registerPost);
router.post('/reset', auth.resetPost);
router.post('/password', auth.passwordPost);

module.exports = router;