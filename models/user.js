const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    Email:String,
    _id:mongoose.Schema.Types.ObjectId,
    Fullname:String,
    Username:String,
    Password:String,
    Salt:String,
    Id_Number:String,
    Birthday:Date,
    Maritalstatus:String,
    Connected:Boolean,
    Revision:Number,
    City:String
});

module.exports = mongoose.model('User',userSchema,"User");