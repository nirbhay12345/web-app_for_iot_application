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

    const newlocation = [
        [72.7751462786681,21.148697627701328],
        [ 72.7739493429148,21.149727013908183],
        [ 72.84039962524588,21.153431687734287],
        [ 72.83941102738027,21.189011700550605],       
        [ 72.79206467461599,21.195373785409142],       
        [ 72.83844132422863,21.218200479878956],       
        [ 72.88218278965876,21.24246216286158],       
        [ 72.65021269284246,21.127548984297245],       
        [ 72.92093730331803,20.922120154999643],       
        [ 73.1146249793156,21.125447140078176],       
    ]

    newlocation.forEach( async (location) => {
   
        const locationName = "Surat, Gujarat, India";

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
    
        const locationCoordinates = { type: 'Point', coordinates: location}
    
        const parkslots = Slots(newslots);
        await parkslots.save();
        console.log(parkslots);
    
        const newParkingArea = { name: locationName, location: locationCoordinates };
        const parking = new ParkSlots(newParkingArea);
        parking.slots.push(parkslots);
        await parking.save();
        console.log(parking);
    });
 
}

seedDB()