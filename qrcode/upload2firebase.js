const {Storage} = require('@google-cloud/storage');
const fileSystem = require("fs");
const express = require("express");
const { number } = require('mathjs');
module.exports = function upload_firebase(track_num)
{
const app = new express();


const storage = new Storage({
    keyFilename: "../qrcode/qr-package-firebase-adminsdk-h96h8-39f11ec4bc.json",
 });

let bucketName = "gs://qr-package.appspot.com";

let filename = '../qrcode/' + track_num + '.png';

// Testing out upload of file
const uploadFile = async() => {

    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',
        },
});

}

uploadFile();

app.listen(process.env.PORT || 8088, () => { console.log('node server running');})

}