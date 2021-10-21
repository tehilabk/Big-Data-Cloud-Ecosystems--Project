var QrCode = require('qrcode-reader');
var qr = new QrCode();
var fs = require('fs');
var Jimp = require("jimp");


module.exports = async function upload_firebase(file_name) {
    var buffer = fs.readFileSync(__dirname + '/downloaded_qrcode/' + file_name);

   Jimp.read(buffer, function (err, image) {
        if (err) {
            console.error(err);
            // TODO handle error
        }
        var qr = new QrCode();
        qr.callback = function (err, value) {
            if (err) {
               // console.error(err);
                // TODO handle error
            }
      
            console.log(value);
        };
        qr.decode(image.bitmap);
    });
}



