var csv_create = require('../mongodb/mongoCSV.js');
var bigml_cunnect = require('../BigML/BigML.js');
var read_json = require('../BigML/readjson.js');
const bigml = require('bigml');
var axios = require('axios').default;
var glob_ok;
async function bigml_process() {
    try {
        glob_ok = await csv_create(function () { });
        glob_ok = await bigml_cunnect(function () { });
        var obj_from_json = await read_json(function () { })
    }
    catch (err) {
        console.log(err);
    }
    finally {
       json_obj = JSON.stringify(obj_from_json)
        // await axios.post('http://localhost:3000/update_bigml',{
        //     package: json_obj,
        // });
        console.log(obj_from_json);
    }
}
bigml_process();