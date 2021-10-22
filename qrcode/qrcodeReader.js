var QrCode = require('qrcode-reader');
var qr = new QrCode();
var fs = require('fs');
var Jimp = require("jimp");
var track_num;
var file_name = '546878070280.png';
//  module.exports = 
// async function do_all(file_name) {
    async function read_qrcode(file_name) {
        try {
            var buffer = fs.readFileSync(__dirname + '/downloaded_qrcode/' + file_name);

            Jimp.read(buffer, async function (err, image) {
                if (err) {
                    console.error(err);
                    // TODO handle error
                }
                var qr = new QrCode();
                qr.callback = async function (err, value) {
                    if (err) {
                        // console.error(err);
                        // TODO handle error
                    }

                    var j_data = value.result;
                    var data = JSON.parse(j_data);
                    track_num = data.tracking_number;
                    console.log(track_num);
                };
                qr.decode(image.bitmap);
            });
        }
        catch
        {
            next(err);
        }
    }
    read_qrcode(file_name);
    // return track_num;
    // console.log(track_num)
// }
// do_all(file_name);
// module.exports = { do_all };


