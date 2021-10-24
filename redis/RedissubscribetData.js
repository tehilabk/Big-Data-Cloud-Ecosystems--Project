var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient()
var mongo_in = require("../mongodb/mongoInsertData.js");
var mongo_up = require("../mongodb/mongoUpdateData.js");
// var viewUpdate = require("../server.js");

var package_per_dis = [
    Tel_Aviv = 0, Haifa = 0, Jerusalem = 0, West_Bank = 0, Central = 0, South = 0, North = 0
];
var district_size = [Tel_Aviv = [small = 0, medium = 0, big = 0], Haifa = [small = 0, medium = 0, big = 0],
Jerusalem = [small = 0, medium = 0, big = 0], West_Bank = [small = 0, medium = 0, big = 0],
Central = [small = 0, medium = 0, big = 0], South = [small = 0, medium = 0, big = 0],
North = [small = 0, medium = 0, big = 0]];

var district_tax = [Tel_Aviv = [low_75 = 0, low_500 = 0, high_500 = 0], Haifa = [low_75 = 0, low_500 = 0, high_500 = 0],
Jerusalem = [low_75 = 0, low_500 = 0, high_500 = 0], West_Bank = [low_75 = 0, low_500 = 0, high_500 = 0],
Central = [low_75 = 0, low_500 = 0, high_500 = 0], South = [low_75 = 0, low_500 = 0, high_500 = 0],
North = [low_75 = 0, low_500 = 0, high_500 = 0]];

module.exports = async function reciv_data() {
    redisClient.subscribe('insert');
    redisClient.subscribe('update');

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    ;
    redisClient.on("message", async function (channel, json_package) {
        if (channel == "insert") {
            mongo_in(json_package);
            var pack_obj = JSON.parse(json_package);
            var district_loc = await get_district(pack_obj.district);
            var size_loc = await get_pack_size(pack_obj.items_list.length);
            var tax_loc = pack_obj.tax_tag;
            package_per_dis[district_loc]++;
            district_size[district_loc][size_loc]++;
            district_tax[district_loc][tax_loc]++;
            // viewUpdate.view_function(package_per_dis,district_size,district_tax);
            console.log("mongo insert")
        }
        else if(channel == "update"){
            mongo_up(key);
            console.log("mongo update");
        }
        else{
          for (let i = 0; i <  package_per_dis.length; i++) {
            package_per_dis[i] = 0;
            for (let j = 0; j < district_size[i].length; j++) {
                district_size[i][j] = 0;
            }
            for (let k = 0; k < district_tax[i].length; k++) {
                district_tax[i][j] = 0;
            } 
          }
         
        }
       
    });
}

redisClient.on('connect', function () {
    console.log('Reciver connected to Redis');
});


server.listen(6061, function () {
    console.log('reciver is running on port 6061');
});

async function get_district(district_name) {
    var district;
    switch (district_name) {
        case "Tel Aviv":
            district = 0;
            break;
        case "Haifa":
            district = 1;
            break;
        case "Jerusalem":
            district = 2;
            break;
        case "West Bank":
            district = 3;
            break;
        case "Central":
            district = 4;
            break;
        case "South":
            district = 5;
            break;
        case "North":
            district = 6;
            break;
    }
    return district;
}
async function get_pack_size(items_size) {
    var size;
    if (items_size <= 3) {
        size = 0;
    }
    else if (items_size <= 7) {
       size = 1;
    }
    else{
        size = 2;
    }
    return size;
}




