var express = require('express');
var router = express.Router();
var session = require('express-session');

/* PREVENTS USERS THAT ARE NOT LOGGED IN TO SEE HOME PAGE */
var redirectHome = (req, res, next) => {
  if (session.userID != null) {
    res.render('home.ejs', { username: session.userID })
  } else {
    next()
  }
}

/* GET SIGNIN PAGE */
router.get('/', redirectHome, function (req, res, next) {
  res.redirect('/users/signin');
});

module.exports = router;
