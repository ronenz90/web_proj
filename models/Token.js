const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    Email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("token", tokenSchema);