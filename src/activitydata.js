const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://127.0.0.1:27017/travel')

// connection check

connect.then(() => {
    console.log('database connected successfully');
})
    .catch(() => {
        console.log('database not connected');
    })

// create a schema
const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }


})
// collection Part
const Activity = new mongoose.model('activity', activitySchema)

module.exports = Activity;