var MongoClient = require('mongodb').MongoClient;
var axios = require('axios').default;
const url = "mongodb+srv://liel_berniker:liel1995@cluster0.2ohvu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var general_info = [package_count = [Tel_Aviv = 0, Haifa = 0, Jerusalem = 0, West_Bank = 0, Central = 0, South = 0, North = 0],
size_count = [small = 0, medium = 0, big = 0]];
var dis_name = ["Tel Aviv", "Haifa", "Jerusalem", "West Bank", "Central", "South", "North"];
var pack_size = ["small", "medium", "big"];
// create an object that contain an info about the packages in mongodb and send the datat to the server
 module.exports =  async function mongodb_data() {
    const collection_name = "packages";
    const db_name = "base1";
    try {
        general_info[0] = await get_for(dis_name.length, 0, collection_name, db_name, function () {
        });
        general_info[1] = await get_for(pack_size.length, 1, collection_name, db_name, function () {
        });
    }
    catch (err) {
        console.log(err);
    } finally {
        json_obj = JSON.stringify(general_info)
        await axios.post('http://localhost:3000/statistic_data',{
            package: json_obj,
        });
    }


}


// find the information from the mongodb by the query
async function mongodb_find_count(query, collection_name, db_name1, callback) {

   var db = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });
    try {
        var db_name = db_name1;
        var dbo = db.db(db_name);
        var res = await dbo.collection(collection_name).find(query).count();
    }
    catch (err) {
        console.log(err);
    }
    finally {
        db.close();
        callback();
        return res;
    }
}


// go over all the information base on the position of the information
async function get_for(size, pos_1,collection_name, db_name, callback) {
    var cur_list = [];
    try {
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
            var ok;

            cur_list[i] = await mongodb_find_count(query, collection_name, db_name, callback);
        }
    }
    catch (err) {
        console.log(err);
    }
    finally {
        return cur_list;
    }

}