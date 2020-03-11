var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var passwordChecker = require('../public/javascripts/checkPassword.js');
var passwordHasher = require('../public/javascripts/hashing.js');
var session = require('express-session');
var bcrypt = require('bcryptjs');
var db;
const saltRounds = 10;
const uri = "mongodb+srv://user:SCR3_MDB42_user@securitytaak-safkk.gcp.mongodb.net/test?retryWrites=true&w=majority";

/* Connect to MongoDB database */
MongoClient.connect(uri, (err, database) => {
  if (err) return console.log(err)
  db = database.db('APLogin')
})

/* Redirect to signin page */
var redirectSignin = (req, res, next) => {
  if (req.session.userID == null) {
    res.redirect('/users/signin');
  } else {
    next()
  }
}

/* Redirect to home page */
var redirectHome = (req, res, next) => {
  if (req.session.userID != undefined) {
    if (req.session.userID != null) {
      res.redirect('/users/home');
    }
  } else {
    next()
  }
}

/* Get signin page */
router.get('/signin', redirectHome, (req, res) => {
  res.render('signin.ejs')
})

/* Get register page */
router.get('/register', redirectHome, (req, res) => {
  res.render('register.ejs')
})

/* Get home page */
router.get('/home', redirectSignin, (req, res) => {
  res.render('home.ejs', { username: req.session.userID })
})

/* Logout user */
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/users/signin');
})

/* Sign in user */
router.post('/signin', redirectHome, (req, res) => {
  const password = req.body.password;
  var query = { username: req.body.username };

  db.collection('users').findOne(query, (err, result) => {
    if (result != null) {
      bcrypt.compare(password, result.password).then(function (result) {
        if (result) {
          req.session.userID = query.username;
          res.redirect('/users/home')
        } else {
          errorMessage = "Invalid credentials";
          res.render('signinError.ejs', { errorMessage });
        }
      });
    } else {
      errorMessage = "Invalid credentials";
      res.render('signinError.ejs', { errorMessage });
    }
  })
})

/* Register user */
router.post('/register', redirectHome, (req, res) => {
  var errorMessage = '';
  if (req.body.password == req.body.passwordCheck) {

    const username = req.body.username;
    const password = req.body.password;

    db.collection('users').findOne({ username: username }, (err, result) => {
      if (result == null) {
        if (passwordChecker.validate(password)) {
          const hashedPassword = passwordHasher.hashPassword(password);
          const url = passwordChecker.makeUrl(hashedPassword);
          const part2Hash = hashedPassword.substring(5, 40).toUpperCase();

          fetch(url).then(response => response.text()).then(text => {
            if (!text.includes(part2Hash)) {
              bcrypt.hash(password, saltRounds, function (err, hash) {
                db.collection('users').insertOne(query = { username: req.body.username, password: hash }, (err, result) => {
                  req.session.userID = query.username;
                  res.redirect('/users/home')
                })
              });
            } else {
              errorMessage = "Password is in a data breach, please choose another password";
              res.render('registerError.ejs', { errorMessage });
            }
          }).catch(err => console.log(err))
        } else {
          errorMessage = "Password is not strong enough, please choose a longer password";
          res.render('registerError.ejs', { errorMessage });
        }
      } else {
        errorMessage = "User already exists, please choose another username";
        res.render('registerError.ejs', { errorMessage });
      }
    })
  } else {
    errorMessage = "Passwords are not the same, please try again";
    res.render('registerError.ejs', { errorMessage });
  }
})

module.exports = router;
