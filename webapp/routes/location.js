const express = require('express');
const router = express.Router();
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const {MAPTOKEN}  = require('../keys');
const parkingAreas = require('../models/parkingAreas');
const geocoder = mbxGeocoding({accessToken: MAPTOKEN});

// search route
router.get('/search', IsLoggedIn, (req,res) => {
    res.render('search');
});

// create route
router.get('/create', IsLoggedIn, (req,res) => {
  
});


// Show Route
router.post('/view', IsLoggedIn, async (req,res) => {
    console.log(req.body.location);
    // forwardgeocoding client
    const geoData = await geocoder.forwardGeocode({
        query: req.body.location,
        limit: 1
      }).send()
    //   location data
      const location = geoData.body.features[0].geometry;
    //   todo -> mongoose query to search all the parking areas within that location
    // parking list areas -> only admin
      res.render('map', {location: location, maptoken:MAPTOKEN});
});

// router.get('/map', (req,res) => {
//     console.log(req.body.location);
//     res.render('map');
// });




  // middleware
  function IsLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

module.exports = router