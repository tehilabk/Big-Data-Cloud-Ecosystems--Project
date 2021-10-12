var admin = require("firebase-admin");
var bucket = "gs://qr-package.appspot.com";
admin.initializeApp({credential: "qr-package-firebase-adminsdk-h96h8-39f11ec4bc.json"}, {storageBucket: bucket});
admin.storage().bucket(bucket).refFromURL("gs://qr-package.appspot.com/qrcode_corrent.png").delete()
.then(function() {
    console.log("deleted successfully!");
})
.catch(function() {
    console.log("unable to delete");
});