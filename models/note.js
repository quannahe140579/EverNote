var mongosee = require("mongoose");
var noteSchema = mongosee.Schema({
    name: String,
    content: String,
    lastEdit: String
});
var note = mongosee.model("Notes", noteSchema);
module.exports = note;