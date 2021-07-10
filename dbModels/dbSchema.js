const mongoose = require('mongoose')

const user_data = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
})

const events_details = mongoose.Schema({
    event_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }

})

const events = mongoose.model('event', events_details)
const signup = mongoose.model('signup', user_data)

module.exports = { signup, events }