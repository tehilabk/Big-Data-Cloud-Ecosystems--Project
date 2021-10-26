const { Storage } = require('@google-cloud/storage');
const fs = require("fs");
// const express = require("express");
var app = require('express')();
const { number } = require('mathjs');
const { nextTick } = require('process');
var server = require('http').Server(app);
const qrcode_read = require("../qrcode/qrcodeReader.js");
const redis_func = require("../redis/RedisDeleteInfo.js");
var axios = require('axios').default;
// module.exports = async
module.exports =async function get_all_files() {
  const storage = new Storage({
    keyFilename: "../qrcode/qr-package-firebase-adminsdk-h96h8-39f11ec4bc.json",
  });
  let bucketName = "gs://qr-package.appspot.com";
  // directory path
  const dir = '../qrcode/downloaded_qrcode';
  // Testing out upload of file
  async function deliv_process() {
    try {
      await delte_dir(dir);
      await create_dir(dir);
      await redis_func();
      axios.post('http://localhost:3000/delete_all');

      const [files] = await storage.bucket(bucketName).getFiles();
      
    files.map(async (file) => {
        try {
          let file_name = file.name;
          await get_png_and_key(file_name, storage, bucketName);
        }
        catch (err) {
          console.log(err);
        }
      });
    }
    catch (err) {
      console.log(err);
    }
    finally{
  //  delete_from_redis(list_key)
    }
  }
  deliv_process();
  // app.listen(process.env.PORT || 8088, () => { console.log('node server running'); })
}

server.listen(8089, function () {
  console.log('firebase is running on port 8089');
});

async function get_png_and_key(file_name, storage, bucketName) {
  try {
  
    let destFilename = '../qrcode/downloaded_qrcode/' + file_name;
    let options = { destination: destFilename, };
    await storage.bucket(bucketName).file(file_name).download(options);
    // await read_key(file_name);
    await storage.bucket(bucketName).file(file_name).delete();
     console.log("delete " +file_name );
  }
  catch (err) {
    console.log(err);
  }
}

async function delte_dir(dir) {
  try {
    fs.rmdirSync(dir, { recursive: true });
  } catch (err) {
    console.error(`Error while deleting ${dir}.`);
  }
}
async function create_dir(dir) {
  fs.mkdir(dir, function (err) {
    if (err) {
      console.log(err)
    }
  });
}
