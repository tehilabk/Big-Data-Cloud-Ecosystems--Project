const simulator = require("../package_formation/creataPackage.js");
var async = require("async");
const qrcode_gen = require("../qrcode/qrcodeGenerator.js");
const redis_func = require("../redis/RedisInsertData.js");
const redis_sub = require("../redis/RedissubscribetData.js");
const down_base= require("../qrcode/firebaseDownload.js");
const fileSystem = require("fs");
var flag = true;
var dir1 = '../qrcode/downloaded_qrcode/';
var i = 0;
var ok_go;
setInterval(async function ()
// async function run_go()
{
  if (flag) {
    await redis_sub();
    flag = false;
  }
  // if(i==7){
  //   ok = down_base();
  //   i=0
  // }
  // else{
  var pack = await simulator.package_create();
  var json_pack = JSON.stringify(pack);
  var num = pack.tracking_number;
  console.log(num);

  await redis_func(json_pack, num);
  await qrcode_gen(json_pack, num);
 i++;
  // }
}, 1000);

setInterval(async function ()
// async function run_go()
{
 down_base();
  // }
}, 10000);

      // run_go();
// module.exports = { run_package };




