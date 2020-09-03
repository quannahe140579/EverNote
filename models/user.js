var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = Schema({
    username: String,
    password: String,
    email: String,
    phone: Number,
    address: String,
    firtName: String,
    lastName: String
})
var user = mongoose.model("User", userSchema);
module.exports = user;