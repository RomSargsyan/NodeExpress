const { Router } = require('express');
const auth = require('../middleware/auth');
const profile = require('../controllers/profile');

const router = Router();

router.get('/', auth, profile.profileGet);
router.post('/', auth, profile.profilePost);

module.exports = router;