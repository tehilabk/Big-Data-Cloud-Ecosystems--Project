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
// the function first delete the info from redis 
// also download all the png from fire base , read all the qrcodes and update the view
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
      // delete information from redis
      await redis_func();
      // update the view
      axios.post('http://localhost:3000/delete_all');
      //  get the file from fire base
      const [files] = await storage.bucket(bucketName).getFiles();
      // go over the files from firebase
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
  }
  deliv_process();
}
server.listen(8089, function () {
  console.log('firebase is running on port 8089');
});

async function get_png_and_key(file_name, storage, bucketName) {
  try {
  // download the file from fire base , based on name
  // read the qrcode and delete the file from firebase
    let destFilename = '../qrcode/downloaded_qrcode/' + file_name;
    let options = { destination: destFilename, };
    await storage.bucket(bucketName).file(file_name).download(options);
     await qrcode_read(file_name);
    await storage.bucket(bucketName).file(file_name).delete();
     console.log("delete " +file_name );
  }
  catch (err) {
    console.log(err);
  }
}
// delete a dir by path
async function delte_dir(dir) {
  try {
    fs.rmdirSync(dir, { recursive: true });
  } catch (err) {
    console.error(`Error while deleting ${dir}.`);
  }
}
// create a dir by path
async function create_dir(dir) {
  fs.mkdir(dir, function (err) {
    if (err) {
      console.log(err)
    }
  });
}

