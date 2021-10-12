
const QRCode = require('qrcode');
module.exports = function qrcode_create(package_json)
  {
	let strData = JSON.stringify(package_json);
	generateQR(strData);
	return 1;
  }
const generateQR = async text => {
	try {
		await QRCode.toFile('../qrcode/qrcode_corrent.png', text);
	} catch(err){
		console.log(err);
	}
}

