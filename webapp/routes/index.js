const express = require('express');
const router = express.Router();
const passport = require('passport');
var User = require('../models/user');

// user page
router.get('/info', IsLoggedIn, (req, res) => {
    res.render('info');
});

// AUTH ROUTES

// Register or sign up route
// router.get('/register', (req, res) => {
//     res.render('login');
// });
  
// register post route
router.post('/register', (req, res) => {
    req.body.username;
    req.body.password;
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
        console.log(err);
        return res.render('login');
        }
        passport.authenticate("local")(req, res , () => {
        res.redirect('/info');
        });
    });
});
  
  // login Route
router.get('/login', (req, res) => {
    res.render('login');
});
  
  // login post route
router.post('/login', passport.authenticate('local', {
    successRedirect: "/info",
    failureRedirect: "/login"
    }),(req, res) => {
});
  
  // logout Route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
  
  // middleware
function IsLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router