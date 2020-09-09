var mongosee = require("mongoose");
var noteSchema = mongosee.Schema({
    name: String,
    content: String,
    lastEdit: String
});
var trash = mongosee.model("Trashs", noteSchema);
module.exports = trash;