const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ngoSchema = new Schema({
    ngoName: String,
    directors: String,
    location: String

})

module.exports = mongoose.model('Ngo', ngoSchema);