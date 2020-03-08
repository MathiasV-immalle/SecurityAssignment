var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var db;
var passwordChecker = require('../public/javascripts/checkPassword.js');
var passwordHasher = require('../public/javascripts/hashing.js');
var session = require('express-session');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const uri = "mongodb+srv://user:SCR3_MDB42_user@securitytaak-safkk.gcp.mongodb.net/test?retryWrites=true&w=majority";

var redirectLogin = (req, res, next) => {
  console.log(session.userID)
  if (session.userID != null) {
    res.render('signin.ejs', {})
  } else {
    next()
  }
}

var redirectHome = (req, res, next) => {
  if (session.userID = null) {
    res.render('signin.ejs', {})
  } else {
    next()
  }
}

MongoClient.connect(uri, (err, database) => {
  if (err) return console.log(err)
  db = database.db('APLogin')
})

/* GET LOGIN FORM*/
// hier geen redirectHome
router.get('/signinPage', (req, res) => {
  res.render('signin.ejs', {})
})

/* GET REGISTER USER FORM */
// hier geen redirectHome
router.get('/registerPage', (req, res) => {
  res.render('register.ejs', {})
})

/* LOGOUT */
router.post('/logout', redirectLogin, (req, res) => {
  session = null;
  res.render('signin.ejs', {})
})

router.get('/signin', redirectLogin, (req, res) => {
  res.render('about.ejs', {})
})

/* SIGN IN USER */
router.post('/signin', redirectHome, (req, res) => {
  const password = req.body.password;
  var query = { username: req.body.username };

  db.collection('users').findOne(query, (err, result) => {
    if (result != null) {
      bcrypt.compare(password, result.password).then(function (result) {
        if (result) {
          session.userID = query.username;
          res.render('about.ejs', { username: query.username })
        } else {
          errorMessage = "verkeerd wachtwoord!";
          res.render('signinError.ejs', { errorMessage });
        }
      });
    } else {
      errorMessage = "gebruiker bestaat niet!";
      res.render('signinError.ejs', { errorMessage });
    }
  })
})

/* REGISTER USER */
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
                console.log(hash);
                db.collection('users').insertOne(query = { username: req.body.username, password: hash }, (err, result) => {
                  session.userID = query.username;
                  res.render('about.ejs', { username: query.username });
                })
              });
            } else {
              errorMessage = "Paswoord zit in een databreach, kies een ander passwoord";
              res.render('registerError.ejs', { errorMessage });
            }
          }).catch(err => console.log(err))
        } else {
          errorMessage = "Paswoord is niet sterk genoeg, kies een ander passwoord";
          res.render('registerError.ejs', { errorMessage });
        }
      } else {
        errorMessage = "Gebruiker bestaat al, kies een andere username";
        res.render('registerError.ejs', { errorMessage });
      }
    })
  } else {
    errorMessage = "Paswoorden zijn niet hetzelfde";
    res.render('registerError.ejs', { errorMessage });
  }
})

module.exports = router;
