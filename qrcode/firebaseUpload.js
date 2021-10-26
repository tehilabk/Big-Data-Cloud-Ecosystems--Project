const { Storage } = require('@google-cloud/storage');
const fileSystem = require("fs");
// const express = require("express");
var app = require('express')();
const { number } = require('mathjs');
var server = require('http').Server(app);
module.exports = async function upload_firebase(track_num) {
    // const app = new express();

   try{
    const storage = new Storage({
        keyFilename: "../qrcode/qr-package-firebase-adminsdk-h96h8-39f11ec4bc.json",
    });
    let bucketName = "gs://qr-package.appspot.com";

    let filename = '../qrcode/uploaded_qrcode/' + track_num + '.png';
    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
        metadata: {
            cacheControl: 'public, max-age=31536000',
        },
    });
}
catch(err){
console.log(err);
}
finally{
return 1;
}




}
server.listen(8088, function () {
    console.log('firebase is running on port 8088');
});

    // app.listen(process.env.PORT || 8088, () => { console.log('node server running'); })

