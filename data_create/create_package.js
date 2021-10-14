const simulator = require("../package_simulator/simulator.js");
const qrcode_gen = require("../qrcode/qrcode_generator.js");
const firebase_up= require("../qrcode/upload2firebase");
const redis_func = require("../redis/RedisForArielSender.js");
const fileSystem = require("fs");
var pack = simulator.package_create();
var json_pack = JSON.stringify(pack);
console.log(pack.tracking_number);
redis_func(json_pack,pack.tracking_number);
qrcode_gen(json_pack,pack.tracking_number);
firebase_up(pack.tracking_number);




