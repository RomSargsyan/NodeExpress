const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('handlebars')
const exhbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')


const User = require('./models/user');
const addRouter = require('./routes/add');
const homeRouter = require('./routes/home');
const basketRouter = require('./routes/basket');
const coursesRouter = require('./routes/courses');


const app = express();
const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(handlebars)
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5e835ce84b72ff26045caff0');
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        
    }
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRouter);
app.use('/add', addRouter);
app.use('/basket', basketRouter);
app.use('/courses', coursesRouter);

app.get('/about', (req, res) => {
    res.render('about')
})

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        const url = 'mongodb+srv://RomSargsyan:HvcWwxiKztKjgEgL@cluster0-exdtt.mongodb.net/shop';

        mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })

        const candidate = await User.findOne();
        if (!candidate) {
            const user = await new User({
                email: 'romsargsayn@mail.ru',
                name: 'Rom',
                basket: { items: [] }
            })

            await user.save();
        }


        app.listen(3000, () => {
            console.log(`server lisining port ${PORT}`);
        })
    } catch (err) {
        console.log(err);


    }

}

start()
