var fs = require('fs');
var p_gen = require('./generator');

var list_json = []


for (let index = 0; index < 5000; index++) {
    var package = p_gen.createPackage();
    list_json[index] = package
    package = null;
}

console.log(list_json)
var lineArray = []
list_json.forEach(function (list_json, index) {
    var line = list_json.join(",");
    lineArray.push(line);
});
var csvContent = lineArray.join("\n");

console.log(csvContent)


fs.writeFile('./Associations.csv', csvContent, 'utf8', function (err) {
    if (err) {
        console.log('Some error occured - file either not saved or corrupted file saved.');
    } else {
        console.log('It\'s saved!');
    }
});