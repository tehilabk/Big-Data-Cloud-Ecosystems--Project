var csv_create = require('../mongodb/mongoCSV.js');
var bigml_cunnect = require('../BigML/BigML.js');
var read_json = require('../BigML/readjson.js');
const bigml = require('bigml');
async function bigml_process()
{
    Promise.resolve("ok").then(()=>{
        csv_create();
    }).then((res)=>{
        bigml_cunnect();
        return 
    }).then( (res)=>{
        const obj_from_json =  read_json()
        return obj_from_json
    }).finally((res)=>{
        console.log(res);
    })

}
bigml_process();