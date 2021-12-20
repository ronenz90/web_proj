const mongoose = require('mongoose');


const customerSchema = mongoose.Schema({
    Email:String,
    _id:mongoose.Schema.Types.ObjectId,
    Fullname:String,
    Id_Number:String,
    Birthday:Date,
    Maritalstatus:String,
    City:String
});

module.exports = mongoose.model('Customer',customerSchema,"Customers");