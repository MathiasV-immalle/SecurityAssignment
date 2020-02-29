var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var db;
var passwordChecker = require('../public/javascripts/checkPassword.js');
var passwordHasher = require('../public/javascripts/hashing.js');

const uri = "mongodb+srv://user:SCR3_MDB42_user@securitytaak-safkk.gcp.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, (err, database) => {
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
        errorMessage = "verkeerd wachtwoord!";
        res.render('signinError.ejs', { errorMessage });
      }
    } else {
      errorMessage = "gebruiker bestaat niet!";
      res.render('signinError.ejs', { errorMessage });
    }
  })
})

/* ADD USER */
router.post('/add', (req, res) => {
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
              db.collection('users').insertOne(query = { username: req.body.username, password: hashedPassword }, (err, result) => {
                res.render('about.ejs', { username: query.username });
              })
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
        errorMessage = "Gebruiker bestaat al, kies een ander passwoord";
        res.render('registerError.ejs', { errorMessage });
      }
    })
  } else {
    errorMessage = "Paswoorden zijn niet hetzelfde";
    res.render('registerError.ejs', { errorMessage });
  }
})

module.exports = router;
