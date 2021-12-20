var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


var mongoDB = 'mongodb+srv://admin:Aa1234567@cluster0.pxmh7.mongodb.net/CashFlow?retryWrites=true&w=majority';
mongoose.connect(mongoDB);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var loginRouter = require('./routes/login');
var signupRouter = require('./routes/users');
var profileRouter= require('./routes/Profile');
var editRouter= require('./routes/edit');
var costsRouter = require('./routes/cost');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/signup',signupRouter);
app.use('/Profile',profileRouter);
app.use('/Edit',editRouter);
app.use('/cost',costsRouter);

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
