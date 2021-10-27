var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();

var sub = redis.createClient()
var myobj;

// for explanations : https://www.sitepoint.com/using-redis-node-js/
// delete information from redis
module.exports =  async function delete_key() {
    redisClient.flushdb( function (err, succeeded) {
        console.log(succeeded); // will be true if successfull
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

