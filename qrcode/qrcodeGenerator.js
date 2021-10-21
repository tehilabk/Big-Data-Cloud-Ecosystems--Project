
const { number } = require('mathjs');
const QRCode = require('qrcode');
const fs = require("fs");
let file_name = '../qrcode/uploaded_qrcode/';
module.exports = async function qrcode_create(package_json, track_num) {
	// directory path
	const dir = '../qrcode/uploaded_qrcode';
    await delete_dir(dir);
	await create_dir(dir);
	file_name = file_name + track_num + '.png';
	let strData = JSON.stringify(package_json);
	await generateQR(package_json);
}
const generateQR = async text => {
	try {
		 QRCode.toFile(file_name, text);
	} catch (err) {
		console.log(err);
	}
}
async function delete_dir(dir)
{
	// delete directory recursively
	try {
		fs.rmdirSync(dir, { recursive: true });
   } catch (err) {
	   console.error(`Error while deleting ${dir}.`);
   }
}
async function create_dir(dir)
{
	fs.mkdir(dir, function (err) {
		if (err) {
			console.log(err)
		}
	});
}

