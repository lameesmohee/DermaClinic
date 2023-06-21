var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require("mongoose")
const expressHbs=require("express-handlebars")
const Handlebars = require("handlebars");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const session=require('express-session')
const flash=require('connect-flash')
const passport=require('passport')

var app = express();
mongoose.set('strictQuery', true)

mongoose.connect('mongodb://127.0.0.1/Dermatology',{useNewUrlParser:true, useUnifiedTopology: true}).then(res=>
{
 console.log("db is connected")
}).catch(error=>
  {
    console.log(error)
  });
  require("./config/passport")
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expressHbs.engine({defaultLayout: 'layout' , handlebars:allowInsecurePrototypeAccess(Handlebars), extname: '.hbs'
}))
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())
app.use(session({
  secret:'Dermatology_?@!',
   cookie: { maxAge: 6000000 },
  rolling: true,
  saveUninitialized:false,
  resave:true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/', indexRouter);
app.use('/users', usersRouter);


// app.use(function(req, res, next) { 
//   res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//    next();
//  });


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