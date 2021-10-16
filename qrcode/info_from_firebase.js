const {Storage} = require('@google-cloud/storage');
const fileSystem = require("fs");
const express = require("express");
const { number } = require('mathjs');
// module.exports = function get_all_files()
{
const app = new express();
const options = '../qrcode/downloaded_qrcode'

const storage = new Storage({
    keyFilename: "../qrcode/qr-package-firebase-adminsdk-h96h8-39f11ec4bc.json",
 });

let bucketName = "gs://qr-package.appspot.com";

// Testing out upload of file
const get_all_files = async() => {
  
        // Lists files in the bucket
        const [files] = await storage.bucket(bucketName).getFiles();
        files.forEach(file => {
          let file_name = file.name;
          let destFilename = '../qrcode/downloaded_qrcode/' + file_name;
          const options = {destination: destFilename, };
           storage.bucket(bucketName).file(file_name).download(options);
           


        });
      
    
    

}

get_all_files().catch(console.error);

app.listen(process.env.PORT || 8088, () => { console.log('node server running');})

}