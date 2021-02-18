var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var hbs = require('hbs');

const flash = require('connect-flash');
const session = require('express-session');
var passport = require('passport');

require('dotenv').config()
require('./config/passport')(passport);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createRouter = require('./routes/create');
var attachAccessoryRouter = require('./routes/attach');
var detailsRouter = require('./routes/details');
var aboutRouter = require('./routes/about')
var registerRouter = require('./routes/register')
var loginRouter = require('./routes/login')

var app = express();
//connect mongoose to express
const dbURI = process.env.DB_URI;
  mongoose.connect(process.env.DB_URI,  {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then((res) => console.log('Database is connected'))
.catch((err) => console.log(err))



// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials("./views/partials");
hbs.registerHelper('isEqual', function (expectValue, value) {
  return value === expectValue;
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
})

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true, 
}))

//connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();

})

//Routes

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/create', createRouter);
app.use('/attach', attachAccessoryRouter);
app.use('/details', detailsRouter);
app.use('/about', aboutRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
