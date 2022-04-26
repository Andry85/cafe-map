const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema({
   username: {
       type: String,
       required: true,
   },
   title: {
        type: String,
        required: true,
        min: 3
   },
   description: {
        type: String,
        required: true,
        min: 3
   },
   rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    lat: {
        type: Number,
        required: true,
        min: -90,
        max: 90

    },
    long: {
        type: Number,
        required: true,
        min: -90,
        max: 90

    },
}, {tymestamps: true});


module.exports = mongoose.model("Pin", PinSchema);