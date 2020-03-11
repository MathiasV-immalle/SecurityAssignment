var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var session = require('express-session')
var randomstring = require("randomstring");

/* Init app */
var app = express();

/* Load view engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Express app configuration */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* Load external files */
app.use("/public/stylesheets", express.static(__dirname + "/public/stylesheets"));
app.use("/public/images", express.static(__dirname + "/public/images"));
app.use("/public/javascripts", express.static(__dirname + "/public/javascripts"));

/* Express session middleware */
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: randomstring.generate(),
  cookie: {
    maxAge: 7200000,
    sameSite: true,
    secure: false
  }
}))

/* Routers */
app.use('/', indexRouter);
app.use('/users', userRouter);

module.exports = app;
