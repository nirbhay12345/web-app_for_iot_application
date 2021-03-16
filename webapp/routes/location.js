const express = require('express');
const router = express.Router();
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const { MAPTOKEN } = require('../keys');
const ParkSlots = require('../models/parkingAreas');
const Slots = require('../models/slots');
const geocoder = mbxGeocoding({ accessToken: MAPTOKEN });

// search route
router.get('/search', IsLoggedIn, (req, res) => {
  res.render('search');
});

// add route
router.get('/create', IsLoggedIn, (req, res) => {
  res.render('create');
});

// create location route
// todo -> increase accuracy upto street level
router.post('/create', IsLoggedIn, async (req, res) => {
  const locationName = req.body.locationName;
  const numberSlots = req.body.numslots;
  const slotArray = [];
  const slots = [];
  for (var i = 1; i <= numberSlots; i++) {
    slotArray[i] = i;
  }
  for (var j = 1; j <= numberSlots; j++) {
    slots[j] = { slotId: j }
  }
  const newslots = { locationName, slots };
  // forwardgeocoding client
  const geoData = await geocoder.forwardGeocode({
    query: locationName,
    limit: 1
  }).send()
  //   location data
  const locationCoordinates = geoData.body.features[0].geometry;
  const newParkingArea = { name: locationName, location: locationCoordinates };
  // await Slots.save();
  ParkSlots.create(newParkingArea, (err, obj) => {
    if (err) {
      console.log(err);
    } else {
      console.log(obj);
      Slots.create(newslots, (err, slotss) => {
        if (err) {
          console.log(err);
        } else {
          console.log(slotss);
          slotss.name = locationName;
          slotss.slots = slots;
          slotss.save()
          obj.slots.push(slotss);
          obj.save();
          console.log(obj);
          res.redirect('/location/create');
        }
      });
    }
  });
});


// Show Route
router.post('/view', IsLoggedIn, async (req, res) => {
  console.log(req.body.location);
  // forwardgeocoding client
  const geoData = await geocoder.forwardGeocode({
    query: req.body.location,
    limit: 1
  }).send()
  //   location data
  const location = geoData.body.features[0].geometry;
  // console.log(location);
  ParkSlots.find({}, (err, obj) => {
    if (err) {
      console.log(err);
    } else {
      console.log(obj);//.schema.obj
      // res.json(areas)
      res.render('map', { Areas: obj, maptoken: MAPTOKEN, name: req.body.location , center: location});
    }
  });


});
//   todo -> mongoose query to search all the parking areas within that location
// parking list areas -> only admin


// router.get('/map', (req,res) => {
//     console.log(req.body.location);
//     res.render('map');
// });




// middleware
function IsLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router