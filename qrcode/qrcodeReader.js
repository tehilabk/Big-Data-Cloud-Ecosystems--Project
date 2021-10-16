var QrCode = require('qrcode-reader');
var qr = new QrCode();

var fs = require('fs');
var Jimp = require("jimp");

 let file_name =  '04920211471101.png';
module.exports = function upload_firebase(file_name)
{
var buffer = fs.readFileSync(__dirname + '/downloaded_qrcode/'+ file_name);

Jimp.read(buffer, function(err, image) {
    if (err) {
        console.error(err);
        // TODO handle error
    }
    var qr = new QrCode();
    qr.callback = function(err, value) {
        if (err) {
            console.error(err);
            // TODO handle error
        }
       return value.result;
    };
    qr.decode(image.bitmap);
});
}