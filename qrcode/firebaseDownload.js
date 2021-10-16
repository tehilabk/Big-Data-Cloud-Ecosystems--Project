const {Storage} = require('@google-cloud/storage');
const fileSystem = require("fs");
const express = require("express");
const { number } = require('mathjs');
const qrcode_read = require("../qrcode/qrcodeReader.js");
const redis_del = require("../redis/RedisDeleteInfo.js");
module.exports = function get_all_files()
{
const app = new express();
const storage = new Storage({
    keyFilename: "../qrcode/qr-package-firebase-adminsdk-h96h8-39f11ec4bc.json",
 });

let bucketName = "gs://qr-package.appspot.com";
	  // directory path
          const dir = '../qrcode/downloaded_qrcode';
// Testing out upload of file
const get_all_files = async() => {
  
        try {
                fs.rmdirSync(dir, { recursive: true });
            } catch (err) {
                console.error(`Error while deleting ${dir}.`);
            }
            fs.mkdir(dir, function(err) {
                    if (err) {
                      console.log(err)
                    } 
            });

        const [files] = await storage.bucket(bucketName).getFiles();
        files.forEach(file => {
          let file_name = file.name;
          let destFilename = '../qrcode/downloaded_qrcode/' + file_name;
          let options = {destination: destFilename, };
           storage.bucket(bucketName).file(file_name).download(options);
           let myobj = qrcode_read(file_name);
           let key_name = myobj.tracking_number;
           redis_del(key_name);
           storage.bucket(bucketName).file(file_name).delete();
           
        });
      
    
    

}

get_all_files().catch(console.error);

app.listen(process.env.PORT || 8088, () => { console.log('node server running');})

}