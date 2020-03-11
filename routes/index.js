var express = require('express');
var router = express.Router();
var session = require('express-session');

/* Sends user with active session to home page */
var redirectHome = (req, res, next) => {
  if (req.session.userID != null) {
    res.render('home.ejs', { username: req.session.userID })
  } else {
    next()
  }
}

/* Get index page */
router.get('/', redirectHome, function (req, res, next) {
  res.redirect('/users/signin');
});

module.exports = router;
