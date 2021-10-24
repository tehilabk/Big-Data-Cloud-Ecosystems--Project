const simulator = require("../package_formation/creataPackage.js");
var async = require("async");
const qrcode_gen = require("../qrcode/qrcodeGenerator.js");
const redis_func = require("../redis/RedisInsertData.js");
const redis_sub = require("../redis/RedissubscribetData.js");
const fileSystem = require("fs");
var flag = true;
 setInterval(async function()
  // async function run_go()
    {
    var pack = await simulator.package_create();
    var json_pack = JSON.stringify(pack);
    var num = pack.tracking_number;
  
    console.log(num);
    if(flag){
      await redis_sub();
      flag = false;
    }
    await redis_func(json_pack, num);
     await qrcode_gen(json_pack,num);
    
 },500);
 
    
      // run_go();
// module.exports = { run_package };




