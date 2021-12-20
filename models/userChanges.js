const mongoose = require('mongoose');


const userChSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Fullname:String,
    Username:String,
    Password:String,
    Id_Number:String,
    Birthday:Date,
    Maritalstatus:String,
    City:String,
    Revision:Number
});

module.exports = mongoose.model('UserChanges',userChSchema,"UserChanges");