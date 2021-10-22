var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient()
var mongo_in = require("../mongodb/mongoInsertData.js");
var mongo_up = require("../mongodb/mongoUpdateData.js");

var package_per_dis={ 
    Tel_Aviv : 0,  Haifa : 0, Jerusalem : 0 ,West_Bank : 0, Central : 0, South : 0, North : 0
};
var district_size = [ Tel_Aviv = {  small : 0,  medium : 0, big : 0},  Haifa ={  small : 0,  medium : 0, big : 0},
Jerusalem = {  small : 0,  medium : 0, big : 0}, West_Bank = {  small : 0,  medium : 0, big : 0},
Central  = {  small : 0,  medium : 0, big : 0}, South = {  small : 0,  medium : 0, big : 0},
North = { small : 0,  medium : 0, big : 0}];

var district_tax = { Tel_Aviv_:{ low_75 : 0,  low_500 : 0, high_500 : 0},  Haifa :{ low_75 : 0,  low_500 : 0, high_500 : 0},
Jerusalem :{ low_75 : 0,  low_500 : 0, high_500 : 0}, West_Bank :{ low_75 : 0,  low_500 : 0, high_500 : 0},
Central :{ low_75 : 0,  low_500 : 0, high_500 : 0}, South :{ low_75 : 0,  low_500 : 0, high_500 : 0},
North :{ low_75 : 0,  low_500 : 0, high_500 : 0}};

module.exports =  async function reciv_data()
{
redisClient.subscribe('insert'); 
redisClient.subscribe('update'); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

;
redisClient.on("message", function (channel, json_package) {
    if(channel == "insert"){
        mongo_in(json_package);
        
    }
    else{
        mongo_up(key); 
    }
    console.log("mongo insert")
});
}

redisClient.on('connect', function() {
    console.log('Reciver connected to Redis');
});


server.listen(6061, function() {
    console.log('reciver is running on port 6061');
});



