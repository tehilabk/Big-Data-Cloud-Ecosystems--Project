var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
const url = "mongodb+srv://liel_berniker:liel1995@cluster0.2ohvu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const collection_name = "packages";
const db_name = "base1";
var items_obj = [];
async function mongodb_update() {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(db_name);
    dbo.collection(collection_name).find({}).toArray(function (err, packages) {
      if (err) throw err;

      packages.forEach(function (pack) {
        let cur_pack = [];
        pack.itemes_list.forEach(function (cur_item) {
          cur_pack.push(cur_item.item);
        });
        var cur_items = cur_pack.join(",");
        items_obj.push(cur_items);
      });
      var csv = items_obj.join("\n");
      fs.writeFile('../BigML/items.csv', csv, 'utf8', function (err) {
        if (err) {
            console.log(err);
        }
    });
      db.close();
    });
  });
}
mongodb_update();
