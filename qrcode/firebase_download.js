const { Storage } = require('@google-cloud/storage');
const fileSystem = require("fs");
var app = require('express')();
var server = require('http').Server(app);
const fs = require("fs");
// const express = require("express");

const { number } = require('mathjs');
const { nextTick } = require('process');

const qrcode_read = require("../qrcode/qrcodeReader.js");
const redis_del = require("../redis/RedisDeleteInfo.js");

// module.exports = async
var key;
// module.exports =
 async function get_all_files() {
    const storage = new Storage({
        keyFilename: "../qrcode/qr-package-firebase-adminsdk-h96h8-39f11ec4bc.json",
    });
    // directory path
    const dir = '../qrcode/downloaded_qrcode';
    // Testing out upload of file
    async function deliv_process() {


        try {
            await delte_dir(dir);
            await create_dir(dir);

            const [files] = await storage.bucket(bucketName).getFiles();
            files.forEach(file => {
                let file_name = file.name;
                let destFilename = '../qrcode/downloaded_qrcode/' + file_name;
                let options = { destination: destFilename, };
                storage.bucket(bucketName).file(file_name).download(options);
                // qrcode_read(file_name);
                key_name = file_name.replace(".png", "");
                redis_del.delete_key(key_name);
                storage.bucket(bucketName).file(file_name).delete();
            });
        }
        catch(err)
        {
            
        }
       
    }
    await deliv_process();
}
get_all_files();

server.listen(8089, function () {
    console.log('firebase is running on port 8089');
});
async function delte_dir(dir) {
    try {
        await fs.rmdirSync(dir, { recursive: true });
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

