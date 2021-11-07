var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
const url = "mongodb+srv://liel_berniker:liel1995@cluster0.2ohvu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var items_obj = [];
//  create a csv by the information about pakages from mongodb
module.exports = async function mongodb_update(callback) {

  var db = await MongoClient.connect(url, { useNewUrlParser: true })
    .catch(err => { console.log(err); });

  try {
    const collection_name = "packages";
    const db_name = "base1";
    var dbo = db.db(db_name);
    //  get all the information from mongo
    packages = await dbo.collection(collection_name).find({}).toArray();
    // go over the packages
      packages.forEach(function (pack) {
        var cur_pack = [];
        pack.items_list.forEach(function (cur_item) {
          cur_pack.push(cur_item.item);
        });
        var order_items = cur_pack.sort();
        var cur_items = order_items.join(",");
        items_obj.push(cur_items);
        items_obj.push(cur_items);
        items_obj.push(cur_items);
        items_obj.push(cur_items);
        items_obj.push(cur_items);
      });
      var csv = items_obj.join("\n");
      // create the csv file
      fs.writeFile('../BigML/items.csv', csv, 'utf8', function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
    catch(err){
      console.log(err);
    }
    finally{
      db.close();
      callback();
      console.log("create csv")
      return 1;
    }
}

