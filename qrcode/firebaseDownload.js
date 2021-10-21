const { Storage } = require('@google-cloud/storage');
const fileSystem = require("fs");
const express = require("express");
const { number } = require('mathjs');
const qrcode_read = require("../qrcode/qrcodeReader.js");
const redis_del = require("../redis/RedisDeleteInfo.js");
module.exports = async function get_all_files() {
  const app = new express();
  const storage = new Storage({
    keyFilename: "../qrcode/qr-package-firebase-adminsdk-h96h8-39f11ec4bc.json",
  });

  let bucketName = "gs://qr-package.appspot.com";
  // directory path
  const dir = '../qrcode/downloaded_qrcode';
  // Testing out upload of file
 async function deliv_process() {

  try{
    await delte_dir(dir);}
    catch
    {
      console.log("cant delete dir")
    }
    try{
    await create_dir(dir);}
    catch
    {
      console.log("cant delete dir")
    }

    const [files] = await storage.bucket(bucketName).getFiles();
    files.forEach(file => {
      let file_name = file.name;
      let destFilename = '../qrcode/downloaded_qrcode/' + file_name;
      let options = { destination: destFilename, };
      storage.bucket(bucketName).file(file_name).download(options);
      qrcode_read(file_name);
      key_name = file_name.replace(".png","");
      redis_del(key_name);
      storage.bucket(bucketName).file(file_name).delete();

    });

  }

  await deliv_process();

  app.listen(process.env.PORT || 8088, () => { console.log('node server running'); })

}
async function delte_dir(dir) {
  try {
    await fs.rmdirSync(dir, { recursive: true });
  } catch (err) {
    console.error(`Error while deleting ${dir}.`);
  }
}
async function create_dir(dir) {
  await fs.mkdir(dir, function (err) {
    if (err) {
      console.log(err)
    }
  });
}
