const mongoose = require("mongoose");


// creating a m\schema for a user

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true } 
})

const User = mongoose.model("User", userSchema);
module.exports = User