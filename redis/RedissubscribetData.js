var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient()
var mongo_in = require("../mongodb/mongoInsertData.js");
var axios = require('axios').default;

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

    
    redisClient.on("message", async function (channel, json_package) {
        if (channel == "insert") {
            mongo_in(json_package);
            await axios.post('http://localhost:3000/update_data', {
                package: json_package,
            });

            console.log("mongo insert")
        }
    });
}

redisClient.on('connect', function () {
    console.log('Reciver connected to Redis');
});


server.listen(6061, function () {
    console.log('reciver is running on port 6061');
});







