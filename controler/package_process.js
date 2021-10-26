const simulator = require("../package_formation/creataPackage.js");
var async = require("async");
const qrcode_gen = require("../qrcode/qrcodeGenerator.js");
const redis_func = require("../redis/RedisInsertData.js");
const redis_sub = require("../redis/RedissubscribetData.js");
const down_base = require("../qrcode/firebaseDownload.js");
const fs = require("fs");
var flag = true;
var i = 0;
var dir = '../qrcode/downloaded_qrcode';
setInterval(async function ()
// async function run_go()
{
  if (flag) {
    await redis_sub();
    flag = false;
  }
    var pack = await simulator.package_create();
    var json_pack = JSON.stringify(pack);
    var num = pack.tracking_number;
    console.log(num);

    await redis_func(json_pack, num);
    await qrcode_gen(json_pack, num);
  // }
}, 2000);

setInterval(async function ()
// async function run_go()
{
     down_base();
  
  // }
}, 45000);




      // run_go();
// module.exports = { run_package };




