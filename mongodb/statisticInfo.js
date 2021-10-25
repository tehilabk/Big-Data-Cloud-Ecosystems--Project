var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://liel_berniker:liel1995@cluster0.2ohvu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const collection_name = "packages";
const db_name = "base1";

var dis_name = ["Tel Aviv", "Haifa", "Jerusalem", "West Bank", "Central", "South", "North"];
var pack_size = ["small", "medium", "big"];

async function mongodb_data() {
  
    Promise.resolve("ok").then(async ()=>{
       const general_info =  await get_for(dis_name.length, 0);
        console.log("for num 1");
    }).finally(()=>{
        console.log(general_info);
    });

}
mongodb_data();


async function mongodb_find_count(query,pos_1,list) {
    Promise.resolve("ok").then(()=>{
        var count;
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(db_name);
        dbo.collection(collection_name).find(query).count(function (err, res) {
                if (err) throw err;
                   list[pos_1] = res;
                db.close();
                 console.log(res + " " + pos_1);
            });
        });
    }).finally(()=>{
        return ok;
    })

}

async function get_for(size, pos_1) {
    var cur_list = [];
    Promise.resolve("ok").then(async function(){
        for (let i = 0; i < size; i++) {
            var query;
            if (pos_1 == 0) {
                var cur = dis_name[i];
                query = { district: cur };
            }
            else {
                var cur = pack_size[i];
                query = { size: cur };
            }
            var ok = await mongodb_find_count(query, i,cur_list);
        }
    }).then(function(){
        console.log (cur_list);
    })  
}