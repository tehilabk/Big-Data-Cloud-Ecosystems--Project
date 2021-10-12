const simulator = require("../packge_simulator/simulator.js");
const qrcode_gen = require("../qrcode/qrcode_generator.js");
const firebase_up= require("../qrcode/upload2firebase");
const redis = require("../redis/RedisForArielSender.js");
const fileSystem = require("fs");
var pack = simulator.package_create();
var json_pack = JSON.stringify(pack);
console.log(pack.tracking_number);
var ok0 = redis(json_pack);
var ok1 = qrcode_gen(json_pack,pack.tracking_number);
var ok2 = firebase_up(pack.tracking_number);




