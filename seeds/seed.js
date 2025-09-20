const { default: mongoose } = require('mongoose');
const ngomodels = require('../models/ngomodels');


mongoose.connect('mongodb://localhost:27017/EduNetDB');

const db = mongoose.connection;

db.on(
    "error",
    console.error.bind(console, "DB Connection Error:"));
db.once("open", () =>{
    console.log("seeding is connected to Database");

});


const seedDB = async () => {
    await ngomodels.deleteMany({});
    const insertSeeds = new ngomodels({
        ngoName: "seed profilename1",
        directors: "Sam, Lati, azania",
        location: "Centurion, olievenhoutbos"
    });
    await insertSeeds.save();
    console.log(`Database seeds inserted: ${insertSeeds}`);
};

seedDB().then(
    () =>{
        mongoose.connection.close();
        console.log("Seeding Ended");
    }
)
