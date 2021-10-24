const { Storage } = require('@google-cloud/storage');
const fs = require("fs");
var async = require("async");
// const express = require("express");
var app = require('express')();
const { number } = require('mathjs');
const { nextTick } = require('process');
var server = require('http').Server(app);
const qrcode_read = require("../qrcode/qrcodeReader.js");
const redis_func = require("../redis/RedisDeleteInfo.js");

// module.exports = async
function get_all_files() {
  const storage = new Storage({
    keyFilename: "../qrcode/qr-package-firebase-adminsdk-h96h8-39f11ec4bc.json",
  });

  let bucketName = "gs://qr-package.appspot.com";
  // directory path
  const dir1 = '../qrcode/downloaded_qrcode/';
  const dir2 = '../qrcode/uploaded_qrcode/';
  // Testing out upload of file
  async function deliv_process() {

    
      await delte_dir(dir1,dir2);
      await create_dir(dir1,dir2);

      const [files] = await storage.bucket(bucketName).getFiles();
      await Promise.all(files.map(async (file) => {
        let file_name = file.name;
        let destFilename = dir + file_name;
        let options = { destination: destFilename, };
        var key;
        storage.bucket(bucketName).file(file_name).download(options)
          .then(async () => {
            key = file_name.replace('.png', '');
            console.log(key);
            await storage.bucket(bucketName).file(file_name).delete();
          })
          .catch((err)=>
          {
            console.log("eroorrrrrrr")
          })
          .finally(async () => {
           await redis_func.delete_key(key);
          })
      }));
      await redis_func.publish_delete();
    
    

  }

  deliv_process();

  // app.listen(process.env.PORT || 8088, () => { console.log('node server running'); })


}
get_all_files();
server.listen(8089, function () {
  console.log('firebase is running on port 8089');
});
async function delte_dir(dir1,dir2) {
  try {
    fs.rmdirSync(dir1, { recursive: true });
    fs.rmdirSync(dir2, { recursive: true });
  } catch (err) {
    console.error(`Error while deleting dir.`);
  }
}
async function create_dir(dir1,dir2) {
  fs.mkdir(dir1, function (err) {
    if (err) {
      console.log(err)
    } });
    fs.mkdir(dir2, function (err) {
      if (err) {
        console.log(err)
      }
  });
}
async function read_key(file_name) {
  return file_name.replace('.png', '');
  try {
    await qrcode_read.do_all(file_name);
  }
  catch
  {
    console.log("qr code read")
  }
}

