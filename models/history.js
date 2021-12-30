const mongoose = require('mongoose');


const customerSchema = mongoose.Schema({
    Password1:String,
    Password2:String,
    Password3:String
});

module.exports = mongoose.model('history',customerSchema,"History");