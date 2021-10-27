const { all } = require("mathjs"); // to do
const fs = require('fs');
let cur_date = new Date();
let corrent_package = {};
var max_items = 10;
var district = 7;
let districts_data = fs.readFileSync('../package_formation/districts.json');
let items_data = fs.readFileSync('../package_formation/package_items.json');
let districts = JSON.parse(districts_data);
let items = JSON.parse(items_data);
async function package_create() {
  await package_Simulator();
  return corrent_package;
}
// create a package with the information:
// - tracking_number
// - items_list - contain an items
// - tax_tag - for the amount of tax pay
// - total_price 
// - size - is small/medium/big
// - district - one of the sevem districts
// - address - contain the address 
// cretae the package and return it
async function package_Simulator() {

  corrent_package.tracking_number = await get_track_number();
  var num_items = Math.floor(Math.random() * max_items) + 1;
  
  insert_items(num_items);
  // fing the package size by items
  if (num_items < 3) {
    corrent_package.size = "small";
  }
  else if (num_items < 8) {
    corrent_package.size = "medium";
  }
  else {
    corrent_package.size = "big";
  }
  var num_district = Math.floor(Math.random() * district) + 1;
  get_distract_and_address(num_district);

}
//  random track number
 async function get_track_number() { // get a uniqe number for the package tracking number
  var digits = 10;
  var num_length = 12;
  var  track_num = "";
  for (let index = 0; index < num_length; index++) {
   track_num += Math.floor(Math.random() * digits);
  }
  return track_num;
}
// insert items to the package randomly
function insert_items(num_item) { // insert items to the package 
      let total_price = 0;
      corrent_package.items_list = [];
      for (let index = 0; index < num_item; index++) {
        let cur_index = Math.floor(Math.random() * items.length);
        corrent_package.items_list.push(items[cur_index]);
        total_price = total_price + items[cur_index].price;
      }
      if (total_price > 75 && total_price < 500) {
        total_price = total_price + Math.floor(total_price * 0.17);
        corrent_package.tax_tag = 1;
      }
      else if (total_price > 499) {
        total_price = total_price + Math.floor(total_price * 0.17) + Math.floor(total_price * 0.182);
        corrent_package.tax_tag = 2;
      }
      else{
        corrent_package.tax_tag = 0;
      }
      corrent_package.total_price = total_price;
    }
    // get the address bt the district
function get_distract_and_address(district_num) { // get the district and random an address
      var address_num = Math.floor(Math.random() * (district - 1));
      switch (district_num) {
        case 1:
          corrent_package.district = "Tel Aviv";
          corrent_package.address = districts[0][address_num];
          break;
        case 2:
          corrent_package.district = "Haifa";
          corrent_package.address = districts[1][address_num];
          break;
        case 3:
          corrent_package.district = "Jerusalem";
          corrent_package.address = districts[2][address_num];
          break;
        case 4:
          corrent_package.district = "West Bank";
          corrent_package.address = districts[3][address_num];
          break;
        case 5:
          corrent_package.district = "Central";
          corrent_package.address = districts[4][address_num];
          break;
        case 6:
          corrent_package.district = "South";
          corrent_package.address = districts[5][address_num];
          break;
        case 7:
          corrent_package.district = "North";
          corrent_package.address = districts[6][address_num];
          break;
      }
    }
  
    module.exports = { package_create };
