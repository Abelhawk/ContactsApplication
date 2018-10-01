let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/contacts";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("contacts");
    dbo.createCollection("users", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
    let newUsers = [
        {name:'jason', email:'jason@stuckinaloop.com', age:25},
        {name:'ashley', email:'ashley@stuckinaloop.com', age:32},
        {name:'bjornbørg', email:'bjornborg@stuckinaloop.com', age:68},
        {name:'tim', email:'timbuckii@stuckinaloop.com', age:44},
        {name:'wilhelmina', email:'wilhelmina@stuckinaloop.com', age:70},
        {name:'tiago', email:'tiago@presonumlaco.com', age:39},
        {name:'yosh', email:'yosh@stuckinaloop.com', age:40},
        {name:'sandro', email:'sandro@stuckinaloop.com', age:167},
        {name:'degio', email:'d.geo@stuckinaloop.com', age:29},
        {name:'m\'baku', email:'mbaku@stuckinaloop.com', age:34}];
    dbo.collection("names").insertMany(newUsers, function(err, res) {
        if (err) throw err;
        console.log("10 names created");
        db.close();
    });
});

