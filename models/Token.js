const mongoose = require('mongoose');


const customerSchema = mongoose.Schema({
    Email:String,
    Token:String
});

module.exports = mongoose.model('token',customerSchema,"Token");