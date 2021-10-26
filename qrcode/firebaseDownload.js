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
var ok ;


// module.exports = async
module.exports = async function get_all_files() {
  const storage = new Storage({
    keyFilename: "../qrcode/qr-package-firebase-adminsdk-h96h8-39f11ec4bc.json",
  });

  let bucketName = "gs://qr-package.appspot.com";
  // directory path
  var dir1 = '../qrcode/downloaded_qrcode/';
  var dir2 = '../qrcode/uploaded_qrcode/';
  // Testing out upload of file

  try {


//   await delte_dir(dir1, dir2);
//  await create_dir(dir1, dir2);

    const [files] = await storage.bucket(bucketName).getFiles();
    await Promise.all(files.map(async (file) => {
      let file_name = file.name;
      let destFilename = dir1 + file_name;
      let options = { destination: destFilename, };
      var key;

      await storage.bucket(bucketName).file(file_name).download(options)
      key = file_name.replace('.png', '');
      console.log(key);
      await storage.bucket(bucketName).file(file_name).delete();
      await redis_func.delete_key(key);

    }));
  } catch (err) {
    console.log(err);
  }
  finally {
    await redis_func.publish_delete();
  
  }
}

  




// app.listen(process.env.PORT || 8088, () => { console.log('node server running'); })






server.listen(8089, function () {
  console.log('firebase is running on port 8089');
});


async function delte_dir(dir1, dir2) {
  try {
    fs.rmdirSync(dir1, { recursive: true });
    fs.rmdirSync(dir2, { recursive: true });
  } catch (err) {
    console.error(`Error while deleting dir.`);
  }
  finally {
  }
}

async function create_dir(dir1, dir2) {
  try {
    fs.mkdir(dir1);
    fs.mkdir(dir2);
  }
  catch (err) {
    console.log(err);
  }
  finally {
  }
}