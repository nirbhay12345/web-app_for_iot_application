const express = require('express');
const router = express.Router();


router.get('/', IsLoggedIn, (req,res) => {
    res.render('slot');
});





  // middleware
  function IsLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

module.exports = router