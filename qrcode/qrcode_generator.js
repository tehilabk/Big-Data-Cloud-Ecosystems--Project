
const QRCode = require('qrcode');
let data = {
    id: 1,
    name: "User",
    email: "user@gmail.com"
};
  
let strData = JSON.stringify(data)

const generateQR = async text => {
	try {
		await QRCode.toFile('./qrcode_corrent.png', text);
	} catch(err){
		console.log(err);
	}
}

generateQR(strData);
