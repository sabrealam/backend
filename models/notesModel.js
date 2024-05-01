const mongoose = require("mongoose");

// creating a m\schema for a notes

const notesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    // createdBy: { type: String, required: true },
    userID: { type: String, required: true }
})

const Notes = mongoose.model("Notes", notesSchema);
module.exports = Notes;