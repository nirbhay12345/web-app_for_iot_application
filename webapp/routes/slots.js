const express = require('express');
const Slots = require('../models/slots');
const router = express.Router();


router.get('/:id', IsLoggedIn, (req,res) => {
    Slots.findById(req.params.id, (err, obj) => {
      if (err) {
        console.log(err);
      }else{
        res.render('slot', {slotDetails: obj});
      }
    });
});





  // middleware
  function IsLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

module.exports = router