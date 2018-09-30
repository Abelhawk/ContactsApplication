let mongoose = require('mongoose');
let url = "mongodb://localhost:27017/contacts";

mongoose.connect(url, function(err, db){
    if (err) throw err;
});

module.exports.mongoose = mongoose;