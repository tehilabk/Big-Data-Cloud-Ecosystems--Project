
const { number } = require('mathjs');
const QRCode = require('qrcode');
const fs = require("fs");
let file_name = '../qrcode/uploaded_qrcode/';
module.exports = async function qrcode_create(package_json, track_num) {
	// directory path
	const dir = '../qrcode/uploaded_qrcode';

	// delete directory recursively
	try {
		await fs.rmdirSync(dir, { recursive: true });
	} catch (err) {
		console.error(`Error while deleting ${dir}.`);
	}
	await fs.mkdir(dir, function (err) {
		if (err) {
			console.log(err)
		}
	});
	file_name = file_name + track_num + '.png';
	let strData = JSON.stringify(package_json);
	generateQR(strData);
}
const generateQR = async text => {
	try {
		await QRCode.toFile(file_name, text);
	} catch (err) {
		console.log(err);
	}
}

