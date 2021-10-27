
const { number } = require('mathjs');
const QRCode = require('qrcode');
const fs = require("fs");
let file_name;
let num;
var ok_go;
const firebase_up = require("../qrcode/firebaseUpload.js");
// generate a qrcode
module.exports = async function qrcode_create(package_json, track_num) {

		// directory path
		file_name = '../qrcode/uploaded_qrcode/' + track_num + '.png';
		num = track_num;
		ok_go =  await generateQR(file_name,package_json,num);
}
// generate a qrcode and upload it to firebase
 async function generateQR(file_name,text,num) {
	try {
		await QRCode.toFile(file_name, text);
		console.log("create qrcode png")
		 await firebase_up(num);
	} catch (err) {
		console.log(err);
	}
}


