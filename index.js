const express = require('express');
const exhbs = require('express-handlebars');
const homeRouter = require('./routes/home');
const coursesRouter = require('./routes/courses');
const addRouter = require('./routes/add');

const app = express();
const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

app.use('/', homeRouter);
app.use('/courses', coursesRouter);
app.use('/add', addRouter);

app.get('/about', (req, res)=> {
    res.render('about')
})

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`server lisining port ${PORT}`);
})