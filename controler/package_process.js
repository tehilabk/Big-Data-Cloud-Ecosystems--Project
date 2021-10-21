const simulator = require("../package_formation/creataPackage.js");
const qrcode_gen = require("../qrcode/qrcodeGenerator.js");
const firebase_up = require("../qrcode/firebaseUpload.js");
const redis_func = require("../redis/RedisInsertData.js");
const fileSystem = require("fs");
 async function run_package() {
    var pack = await simulator.package_create();
    var json_pack = JSON.stringify(pack);
    console.log(pack.tracking_number);
    await redis_func(json_pack, pack.tracking_number);
    await qrcode_gen(json_pack, pack.tracking_number);
    await firebase_up(pack.tracking_number);
}

 module.exports = { run_package };




