var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://liel_berniker:liel1995@cluster0.2ohvu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const collection_name = "packages";
const db_name = "base1";
module.exports = async function mongodb_update(json_package) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(db_name);
    var myobj = JSON.parse(json_package);
    dbo.collection(collection_name).insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}
