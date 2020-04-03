const bcrypt = require('bcryptjs');
const { Router } = require('express');
const User = require('./../models/user');

const router = Router();

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        isLogin: true,
        loginError: req.flash('loginError'),
        registerErroe: req.flash('registerErroe')
    })
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const candidate = await User.findOne({ email });


        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)
            if (areSame) {
                req.session.user = candidate;
                req.session.isAuthentication = true;
                req.session.save(err => {
                    if (err) {
                        throw err
                    }
                    res.redirect('/')
                })
            } else {
                req.flash('loginError', 'Inncorrect email or password');
                res.redirect('/auth/login#login')
            }
        } else {
            req.flash('loginError', 'Inncorrect email or password');
            res.redirect('/auth/login#login')
        }
    } catch (err) {
        console.log(err);

    }
})

router.post('/register', async (req, res) => {
    try {
        const { email, password, confirm, name } = req.body;
        const candidate = await User.findOne({ email });

        if (!candidate) {
            const hashPassword = await bcrypt.hash(password, 10)
            const user = await new User({
                name,
                email,
                basket: { items: [] },
                password: hashPassword,

            });

            req.session.user = user;
            req.session.isAuthentication = true;
            await user.save();
            await req.session.save(err => {
                if (err) {
                    throw err
                } else {
                    res.redirect('/')
                }
            })
        } else {
            req.flash('registerErroe', 'This email address already exists')
            res.redirect('/auth/login#register')
        }

    } catch (err) {
        console.log(err);

    }
})

module.exports = router;