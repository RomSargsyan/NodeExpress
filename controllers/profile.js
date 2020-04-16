const User = require('../models/user');

exports.profileGet = async (req, res) => {
    res.render('profile', {
        title: 'profile',
        isProfile: true,
        user: req.user.toObject(),
        csrf: req.csrfToken()
    })
};

exports.profilePost = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        const toChange = {
            name: req.body.name
        }

        if (req.file) {
            toChange.avatarUrl = req.file.path
        }

        Object.assign(user, toChange)
        await user.save()
        res.redirect('/profile')
    } catch (e) {
        console.log(e)
    }
}
