const parkSlots = require('../seeds/parkingAreas');
const ParkSlots = require('../models/parkingAreas');
const Slots = require('../models/slots');
const mongoose = require('mongoose');
const { MONGOURI } = require('../keys');

// database config
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('Connected to DB'))
    .catch(error => console.log(error.message));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedDB = async () => {
    await ParkSlots.deleteMany({});
    await Slots.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const locationName = parkSlots[20].properties.city_name + "," + parkSlots[20].properties.state_name + "," + parkSlots[20].properties.country_name;

        const numberSlots = 30;//no of slots in a given parking area
        const slotArray = [];
        const slots = [];
        for (let k = 1; k <= numberSlots; k++) {
            slotArray[k] = k;
        }
        for (let j = 1; j <= numberSlots; j++) {
            slots[j] = { slotId: j }
        }
        const newslots = { name: locationName, slots: slots };

        const slot_loc = Math.floor(Math.random() * 9 + 1);
        var slot_loc_exa;
        switch (slot_loc) {
            case 0: slot_loc_exa = Math.floor(Math.random() * 126);
                break;
            case 1:slot_loc_exa = Math.floor(Math.random() * 24);
                break;
            case 2:slot_loc_exa = Math.floor(Math.random() * 87);
                break;
            case 3:slot_loc_exa = Math.floor(Math.random() * 62);
                break;
            case 4:slot_loc_exa = Math.floor(Math.random() * 452);
                break;
            case 5:slot_loc_exa = Math.floor(Math.random() * 26);
                break;
            case 6:slot_loc_exa = Math.floor(Math.random() * 42);
                break;
            case 7:slot_loc_exa = Math.floor(Math.random() * 188);
                break;
            case 8:slot_loc_exa = Math.floor(Math.random() * 202);
                break;
            case 9:slot_loc_exa = Math.floor(Math.random() * 52);
                break;
            case 10:slot_loc_exa = Math.floor(Math.random() * 4002);
                break;
            default:
                break;
        } 
         
        // for (var m = 1; m <70; m++){
        //     slot_loc_exa = m;
        // }

        const locationCoordinates = { type: 'Point', coordinates: parkSlots[20].geometry.coordinates[slot_loc][0][slot_loc_exa] };
        console.log(locationCoordinates);

        const parkslots = Slots(newslots);
        await parkslots.save()
        console.log(parkslots);

        const newParkingArea = { name: locationName, location: locationCoordinates };
        const parking = new ParkSlots(newParkingArea);
        parking.slots.push(parkslots)
        await parking.save()
        // parkslots.name = locationName;
        // parkslots.slots = slots;
        // parking.slots.push(parkslots, async (err, obj) => {
        // await obj.save()
        // });
        // await parking.save();
        console.log(parking);
    }
}


seedDB()//.then(() => {
//     mongoose.connection.close();
// })