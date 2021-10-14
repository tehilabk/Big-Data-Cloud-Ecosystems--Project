
const { number } = require('mathjs');
const QRCode = require('qrcode');
let file_name = '../qrcode/';
module.exports = function qrcode_create(package_json,track_num)
  {
	 file_name = file_name + track_num + '.png';
	let strData = JSON.stringify(package_json);
	generateQR(strData);
  }
const generateQR = async text => {
	try {
		await QRCode.toFile(file_name, text);
	} catch(err){
		console.log(err);
	}
}

