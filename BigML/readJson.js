//include file system modul
const { SSL_OP_TLS_D5_BUG } = require('constants');
 const fs = require('fs');
 module.exports = async function create_obj(callback) {
    var list = [];

    try {

        const rowdata = fs.readFileSync('./dataset.json', 'utf8');

        // parse JSON string to JSON object
        const data = JSON.parse(rowdata);


        var items = data['object']['associations']['items'];
        var i = 0;
        data['object']['associations']['rules'].map(obj => {
            if(i<15){
            var products = [];
            var lhs = obj['lhs'];
            var rhs = obj['rhs'];


            lhs.forEach(element => {
                products.push(items[element].name);
            });

            rhs.forEach(element => {
                products.push(items[element].name);
            });

            var conf = obj['confidence'];
            var sup = obj['support'][0];

            var t = {"products": products, "conf": conf, "sup": sup};
            list.push(t);
            i++;
        }

        });
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
    finally{
        console.log("create object")
        callback();
        return list;   
    }
}
