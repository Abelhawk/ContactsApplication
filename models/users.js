//Schema

let mongoose = require('../config/mongoose.js').mongoose;

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    email: String,
    age: Number
});

let user = mongoose.model('user', userSchema);
module.exports = user;