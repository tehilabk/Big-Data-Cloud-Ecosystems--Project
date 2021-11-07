const simulator = require("../package_formation/creataPackage.js");
var async = require("async");
const qrcode_gen = require("../qrcode/qrcodeGenerator.js");
const redis_func = require("../redis/RedisInsertData.js");
const redis_sub = require("../redis/RedissubscribetData.js");
const down_base = require("../controler/update_delete_process.js");
const statistic = require("../mongodb/statisticInfo.js");
var bigml_process = require('../BigML/table_create.js');
const fs = require("fs");
var flag = true;
var i = 0;
var dir = '../qrcode/downloaded_qrcode';
// function that run every 1.5 seconds and create a package and update
setInterval(async function ()
// async function run_go()
{
  // connect to the redis subscriber once
  if (flag) {
    await redis_sub();
    flag = false;
  }
  // create a package object
    var pack = await simulator.package_create();
    var json_pack = JSON.stringify(pack);
    var num = pack.tracking_number;
    console.log(num);
// update the redis with the pakage information
// create a qrcode png and upload it to firebase
    await redis_func(json_pack, num);
    await qrcode_gen(json_pack, num);
  // }
},1500);
// run a function that deliver the packages by deleting their information from redis 
//  download the png of the qrcode from firebase and read it 
// and update the information in the view

setInterval(async function ()
// async function run_go()
{
     down_base();
  
  // }
}, 45000);
// run a function that take an information about the pacakages in mongodb 
setInterval(async function ()
// async function run_go()
{
     statistic();
  
  // }
}, 35000);
// run a function that use the bigml for data 
setInterval(async function ()
// async function run_go()
{
     bigml_process();
  
  // }
}, 50000);







