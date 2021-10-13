var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient()
var myobj;

// for explanations : https://www.sitepoint.com/using-redis-node-js/
module.exports = function redis_update(package,key)
{
app.get('/test', function (req, res) {
    myobj = JSON.parse(package);
    // Store string  
    redisClient.set(key, JSON.stringify(myobj), function (err, reply) {
        console.log(reply);
    });


    res.send('תקשרתי עם רדיס....')
});

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
