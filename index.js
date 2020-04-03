const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('handlebars')
const session = require('express-session');
const exhbs = require('express-handlebars');
const MongoDBStore = require('connect-mongodb-session')(session);
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

//middleware
const csrf = require('csurf');
const flash = require('express-flash');
const userMiddleware = require('./middleware/user');
const varMiddleware = require('./middleware/variable');


//routes
const addRouter = require('./routes/add');
const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');
const ordersRouter = require('./routes/orders');
const basketRouter = require('./routes/basket');
const coursesRouter = require('./routes/courses');

const MONGOGB_URI = 'mongodb+srv://RomSargsyan:HvcWwxiKztKjgEgL@cluster0-exdtt.mongodb.net/shop';

const app = express();
const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(handlebars)
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const store = new MongoDBStore({
    uri: MONGOGB_URI,
    collection: 'session',
  });

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
}));

//middleware
app.use(csrf());
app.use(flash());
app.use(userMiddleware);
app.use(varMiddleware);

//routes
app.use('/', homeRouter);
app.use('/add', addRouter);
app.use('/auth', authRouter);
app.use('/orders', ordersRouter);
app.use('/basket', basketRouter);
app.use('/courses', coursesRouter);

app.get('/about', (req, res) => {
    res.render('about')
});

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        mongoose.connect(MONGOGB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })

        app.listen(3000, () => {
            console.log(`server lisining port ${PORT}`);
        })
    } catch (err) {
        console.log(err);


    }

}

start()
