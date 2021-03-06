const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const expreSession = require('express-session');
var User = require('./models/user');
const { MONGOURI } = require('./keys');


// passport config
app.use(expreSession({
    secret:"i love web development",
    resave:false,
    saveUninitialized:false
  }));
  passport.use(new localStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

// database config
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log('Connected to DB'))
.catch(error => console.log(error.message));


// app config
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

// root route
app.get('/', (req, res) => {
    res.render('home');
});

// user page
app.get('/info', IsLoggedIn, (req, res) => {
    res.render('info');
});

// AUTH ROUTE

// Register or sign up route
app.get('/register', (req, res) => {
    res.render('register');
  });
  
  // register post route
  app.post('/register', (req, res) => {
    req.body.username;
    req.body.password;
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
      if (err) {
        console.log(err);
        return res.render('register');
      }
      passport.authenticate("local")(req, res , () => {
        res.redirect('/info');
      });
    });
  });
  
  // login Route
  app.get('/login', (req, res) => {
    res.render('login');
  });
  
  // login post route
  app.post('/login', passport.authenticate('local', {
    successRedirect: "/info",
    failureRedirect: "/login"
  }),(req, res) => {
  });
  
  // logout Route
  app.get('/logout', (req, res) => {
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



app.listen(3000, (req, res) => {
    console.log('Server is running');
});