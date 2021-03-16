const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local');
const expreSession = require('express-session');
var User = require('./models/user');
const { MONGOURI } = require('./keys');
// const seedDB = require('./seeds/index');
require('./seeds/temp_index');

// routes required
var indexRoutes = require('./routes/index')
var slotRoutes = require('./routes/slots')
var locationRoutes = require('./routes/location')

// passport config
app.use(expreSession({
  secret: "i love web development",
  resave: false,
  saveUninitialized: false
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
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// root route
app.get('/', (req, res) => {
  res.render('home');
});

app.use('/', indexRoutes);
app.use('/slots', slotRoutes);
app.use('/location', locationRoutes);

app.listen(3000, (req, res) => {
  console.log('Server is running');
});