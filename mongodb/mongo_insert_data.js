var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://liel_berniker:liel1995@cluster0.2ohvu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

module.exports = function mongodb_update(json_package)
{
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("base1");
    var myobj = JSON.parse(json_package);
    dbo.collection("packages").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}
