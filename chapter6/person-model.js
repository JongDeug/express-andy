const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: { type: String, required: true }
});

module.exports = mongoose.model('Person', personSchema);