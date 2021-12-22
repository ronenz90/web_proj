const mongoose = require('mongoose');


const costSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Id_Number:String,
    Date:Date,
    Period:Number,
    Category:String,
    Name:String,
    Sum:Number
});

module.exports = mongoose.model('Cost',costSchema,"purchase");