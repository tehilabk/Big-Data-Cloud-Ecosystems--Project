var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
// var mongo_in = require("../mongodb/mongoInsertData.js");

var sub = redis.createClient()
var myobj;

// for explanations : https://www.sitepoint.com/using-redis-node-js/
// insert information to redis by the key the function gets , and publish an insert item
module.exports = async function redis_update(json_package, key) {

    myobj = JSON.parse(json_package);
    // publish that redis has been inserted item
    redisClient.publish("insert", json_package, function (err){
        if(err){
            console.log(err);
        } 
        else 
        console.log('published')
    });
    // Store json by key in redis db
     redisClient.set(key, JSON.stringify(myobj), function (err, reply) {
        console.log(reply);
    });
}
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

