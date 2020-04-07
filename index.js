const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('handlebars')
const session = require('express-session');
const exhbs = require('express-handlebars');
const MongoDBStore = require('connect-mongodb-session')(session);
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const keys = require('./keys');

//middleware
const csrf = require('csurf');
const flash = require('express-flash');
const errorHandler = require('./middleware/error');
const userMiddleware = require('./middleware/user');
const fileMiddelware = require('./middleware/file');
const varMiddleware = require('./middleware/variable');

//routes
const addRouter = require('./routes/add');
const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');
const ordersRouter = require('./routes/orders');
const basketRouter = require('./routes/basket');
const coursesRouter = require('./routes/courses');
const profileRouter = require('./routes/profile');


const app = express();
const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(handlebars),
    helpers: require('./utils/helperHbs')
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.urlencoded({ extended: true }));

const store = new MongoDBStore({
    uri: keys.MONGOGB_URI,
    collection: 'session',
});

app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));
// app.use(csrf());
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);
app.use(fileMiddelware.single('avatar'));


//routes
app.use('/', homeRouter);
app.use('/add', addRouter);
app.use('/auth', authRouter);
app.use('/orders', ordersRouter);
app.use('/basket', basketRouter);
app.use('/courses', coursesRouter);
app.use('/profile', profileRouter);

app.use(errorHandler);


const PORT = process.env.PORT || 3000;

async function start() {
    try {
        mongoose.connect(keys.MONGOGB_URI, {
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
