var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var mongo_in = require("../mongodb/mongoInsertData.js");
var sub = redis.createClient()
var myobj;

// for explanations : https://www.sitepoint.com/using-redis-node-js/
module.exports = async function redis_update(json_package, key) {

    myobj = JSON.parse(json_package);
    // Store string  
    await redisClient.set(key, JSON.stringify(myobj), function (err, reply) {
        console.log(reply);
    });

   await mongo_in(json_package);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    redisClient.on('connect', function () {
        console.log('Sender connected to Redis');
    });
    server.listen(6062, function () {
        console.log('Sender is running on port 6062');
    });

}