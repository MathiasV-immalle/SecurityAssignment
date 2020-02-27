var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
var db;
var passwordChecker = require('../public/javascripts/checkPassword.js');
var passwordHasher = require('../public/javascripts/hashing.js');

MongoClient.connect('mongodb://localhost:27017', (err, database) => {
  if (err) return console.log(err)
  db = database.db('APLogin')
})

/* GET LOGIN FORM*/
router.get('/signinPage', (req, res) => {
  res.render('signin.ejs', {})
})

/* GET REGISTER USER FORM */
router.get('/registerPage', (req, res) => {
  res.render('register.ejs', {})
})

/* SIGN IN USER */
router.post('/signin', (req, res) => {
  const hashedPassword = passwordHasher.hashPassword(req.body.password);
  var query = { username: req.body.username };

  db.collection('users').findOne(query, (err, result) => {
    if (result != null) {
      if (result.password == hashedPassword) {
        res.render('about.ejs', { username: query.username })
      } else {
        console.log("verkeerd wachtwoord!")
        res.redirect('/users/signinPage');
      }
    } else {
      console.log("gebruiker bestaat niet!");
      res.redirect('/users/signinPage');
    }
  })
})

/* ADD USER */
router.post('/add', (req, res) => {
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
              db.collection('users').insertOne(query = { username: req.body.username, password: hashedPassword }, (err, result) => {
                res.render('about.ejs', { username: query.username });
              })
            } else {
              console.log("Paswoord zit in een databreach, kies een ander passwoord");
              res.redirect('/users/registerPage');
            }
          }).catch(err => console.log(err))
        } else {
          console.log("Paswoord is niet sterk genoeg!");
          res.redirect('/users/registerPage');
        }
      } else {
        console.log("Gebruiker bestaat al!");
        res.redirect('/users/registerPage');
      }
    })
  } else {
    console.log("De 2 paswoorden zijn niet hetzelfde");
    res.redirect('/users/registerPage');
  }
})

module.exports = router;
