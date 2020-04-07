const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { Router } = require('express');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const sendgrid = require('nodemailer-sendgrid-transport');

const keys = require('../keys');
const User = require('./../models/user');
const resetEmail = require('../emails/reset');
const regEmail = require('../emails/registrations');
const { regValidator } = require('../utils/validator');

const router = Router();
const transporter = nodemailer.createTransport(sendgrid({
    auth: {
        api_key: keys.API_KEY_SENDGRID
    }
}))

router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        isLogin: true,
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError')
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })
})

router.get('/reset', (req, res) => {
    res.render('auth/reset', {
        title: 'Reset password',
        error: req.flash('error')
    })
})

router.get('/password/:token', async (req, res) => {
    if (!req.params.token) {
        return res.redirect('/auth/login')
    }
    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExp: { $gt: Date.now() }
        })

        if (!user) {
            return res.redirect('/auth/login#login')
        } else {
            res.render('auth/password', {
                title: 'New password',
                error: req.flash('error'),
                userId: user._id.toString(),
                token: user.resetToken,
            })
        }
    } catch (err) {
        console.log(err);
    }
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

router.post('/register', regValidator, async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('registerError', errors.array()[0].msg)
            return res.status(422).redirect('/auth/login#register')
        }

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
        await transporter.sendMail(regEmail(email));
        res.redirect('/auth/login#login');
    } catch (err) {
        console.log(err);
    }
})

router.post('/reset', (req, res) => {
    crypto.randomBytes(32, async (err, buf) => {
        if (err) {
            req.flash('error', 'Crypto error');
            return res.redirect('/auth/reset');
        } else {
            const token = buf.toString('hex');
            const candidate = await User.findOne({ email: req.body.email })

            if (candidate) {
                candidate.resetToken = token;
                candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
                transporter.sendMail(resetEmail(req.body.email), function (err, res) {
                    if (err) {
                        console.log(err)
                    }
                    console.log(res);
                });
                await candidate.save();
                res.redirect(`/auth/password/${candidate.resetToken}`);

            } else {
                req.flash('error', 'This email is not valid');
                return res.redirect('/auth/reset');
            }
        }
    })

})

router.post('/password', async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.body.userId,
            resetToken: req.body.token,
            resetTokenExp: { $gt: Date.now() }
        });

        if (user) {
            user.password = await bcrypt.hash(req.body.password, 10);
            user.resetToken = undefined;
            user.resetTokenExp = undefined;
            await user.save();
            res.redirect('/auth/login#login')
        } else {
            req.flash('error', 'Token expired');
            return res.redirect('/auth/login#login');
        }
    } catch (err) {
        console.log(err);
    }

})

module.exports = router;