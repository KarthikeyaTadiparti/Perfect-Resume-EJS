const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    name: String,
    modified_at: Date,
});

module.exports = mongoose.model("Document", documentSchema);
