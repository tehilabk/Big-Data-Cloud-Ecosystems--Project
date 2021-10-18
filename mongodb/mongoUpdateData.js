var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://liel_berniker:liel1995@cluster0.2ohvu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const collection_name = "packages";
const db_name = "base1";
module.exports = async function mongodb_update(key)
{
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(db_name);
    var myquery = { tracking_number: key };
    var newvalues = { $set: {received:1} };
    await dbo.collection(collection_name).updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("document updated");
      db.close();
    });
  });
}
