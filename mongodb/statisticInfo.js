var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://liel_berniker:liel1995@cluster0.2ohvu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const collection_name = "packages";
const db_name = "base1";

var dis_name = ["Tel Aviv", "Haifa", "Jerusalem", "West Bank", "Central", "South", "North"];
var pack_size = ["small", "medium", "big"];
var general_info = [package_count = [Tel_Aviv = 0, Haifa = 0, Jerusalem = 0, West_Bank = 0, Central = 0, South = 0, North = 0],
size_count = [small = 0, medium = 0, big = 0]];

async function mongodb_data() {

   try{
     await for_insert(dis_name.length, 0);
     await for_insert(pack_size.length, 1);
      
   }
   catch{
       console.log(err);
   }
    console.log(general_info);
}
mongodb_data();


async function mongodb_find_count(query, pos_1, pos_2, func1) {
    MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db(db_name);
        count = dbo.collection(collection_name).find(query).count(function (err, res) {
            if (err) throw err;
            db.close();
            console.log(res + " " + pos_1);
        });
        var temp = await func1(pos_1, pos_2, count);
        return 1;
    });
}
async function insert_data(pos_1, pos_2, num) {
    general_info[pos_1][pos_2] = num;
    return 1;
}
async function for_insert(size, pos_1) {
    for (let i = 0; i < size; i++) {
        var query;
        if (pos_1 == 0) {
            var cur = dis_name[i];
            var query = { district: cur };
        }
        else {
            var cur = pack_size[i];
            var query = { size: cur };
        }
        var temp = await mongodb_find_count(query, pos_1, i, insert_data);
    }
    return 1;
}