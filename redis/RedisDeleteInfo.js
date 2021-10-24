var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();

var sub = redis.createClient()
var myobj;

// for explanations : https://www.sitepoint.com/using-redis-node-js/
async function delete_key(key) {
     redisClient.del(key, function (err, reply) {
        console.log(reply);
        redisClient.publish("update", key, function (err) {
            if(err){
                console.log(err);
            } 
            else 
            console.log('updated')
        });
    });

}
async function publish_delete() {
   redisClient.publish("delete_all", key, function (err) {
       if(err){
           console.log(err);
       } 
       else 
       console.log('delete')
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
    server.listen(6063, function () {
        console.log('Sender is running on port 6063');
    });

module.exports ={delete_key,publish_delete};