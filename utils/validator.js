const { body } = require('express-validator');
const User = require('../models/user');

exports.regValidator = [
    body('email')
        .isEmail().withMessage('Email is incorrect')
        .custom(async (value, { req }) => {
            try {
                const user = await User.findOne({ email: value })
                if (user) {
                    return Promise.reject('This is mail this is busy')
                }
            } catch (err) {
                console.log(err);
            }
        })
        .normalizeEmail(),
    body('password', 'password is incorrect, minimum 6 symbols, maximum 30')
        .isLength({ min: 6, max: 30 }).isAlphanumeric()
        .trim(),
    body('confirm')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        })
        .trim(),
    body('name', 'Name is minum 2 symbols').isLength({ min: 2, max: 100 })
];

exports.coursesValidator = [
    body('title').isLength({ min: 3, max: 50 }).withMessage('Title is length minimum 3 symbol'),
    body('price').isNumeric().withMessage('Price is only number'),
    body('img').isURL().withMessage('Image Url must be correct')
]