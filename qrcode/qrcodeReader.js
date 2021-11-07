var QrCode = require('qrcode-reader');
var qr = new QrCode();
var fs = require('fs');
var Jimp = require("jimp");
var track_num;
//  read the qrcode by the name of the png, find it by path
module.exports = async function read_qrcode(file_name) {
    try {
      
        var buffer = fs.readFileSync(__dirname + '/downloaded_qrcode/' + file_name);

        Jimp.read(buffer, async function (err, image) {
            var qr = new QrCode();
            qr.callback = async function (err, value) {
            };
            qr.decode(image.bitmap);
        });
    }
    catch
    {
        track_num = file_name.replace('.png', '');
    }
}




