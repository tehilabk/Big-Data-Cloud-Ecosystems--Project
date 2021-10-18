const simulator = require("../package_formation/creataPackage.js");
const qrcode_gen = require("../qrcode/qrcodeGenerator.js");
const firebase_up = require("../qrcode/firebaseUpload.js");
const redis_func = require("../redis/RedisInsertData.js");
const fileSystem = require("fs");
module.exports = async function run_package() {
    var pack = simulator.package_create();
    var json_pack = JSON.stringify(pack);
    console.log(pack.tracking_number);
    redis_func(json_pack, pack.tracking_number);
    qrcode_gen(json_pack, pack.tracking_number);
    firebase_up(pack.tracking_number);
}



