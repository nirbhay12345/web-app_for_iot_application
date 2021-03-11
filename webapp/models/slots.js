const mongoose = require('mongoose');

var slotSchema = new mongoose.Schema({
      name:{type:String},
      slots: [
        {
          slotId: {
            type: String
          },
          status : {
              type: String, 
              default: 'free'
          },
          uid : {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User'
          }
        }
    ]
});

module.exports = mongoose.model("Slots", slotSchema);
