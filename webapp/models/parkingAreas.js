const mongoose = require('mongoose');

var parkingSchema = new mongoose.Schema({
    name: {type:String},
    location: { // give location name just
          type: {
              type: String, 
              enum: ['Point'], 
              required: true
          },
          coordinates: {
              type: [Number],
              required: true
          }
      },
      slots: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Slots"
        }
     ]
});


module.exports = mongoose.model("ParkSlots", parkingSchema);
