var QrCode = require('qrcode-reader');
var qr = new QrCode();
var fs = require('fs');
var Jimp = require("jimp");
var track_num;

module.exports = async function read_qrcode(file_name,callback_2) {
    try {
      
        var buffer = fs.readFileSync(__dirname + '/downloaded_qrcode/' + file_name);

        Jimp.read(buffer, async function (err, image) {
            if (err) {
             console.error(err);
            }
            var qr = new QrCode();
            qr.callback = async function (err, value) {
                if (err) {
                     console.error(err);
                }

                var j_data = value.result;
                var data = JSON.parse(j_data);
                track_num = data.tracking_number;
            };
            qr.decode(image.bitmap);
        });
    }
    catch
    {
        track_num = file_name.replace('.png', '');
    }
    finally{
        callback_2(track_num);
        return track_num;
    }
}




