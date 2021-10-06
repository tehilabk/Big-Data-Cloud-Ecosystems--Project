const { all } = require("mathjs"); // to do
let cur_date = new Date();
let corrent_package = {};
var max_items = 10;
var district = 7;
var items = [{
    "item": "Headphone", "price": 200}, { "item": "Smartwatch", "price": 500}, { "item": "Phone", "price": 2000},
     { "item": "Keyboard","price": 70}, {"item": "Earphone", "price": 300},{"item": "Tablet","price": 3120},
     { "item": "Computer","price": 4500}, {"item": "Microphone", "price": 80}, { "item": "Mousepad", "price": 35}, 
     { "item": "Auxcable","price": 2,},{"item": "Hdmicable", "price": 65}, {  "item": "Diskonkey", "price": 110}, 
     { "item": "Phonecharger", "price": 130}, { "item": "Xbox", "price": 2670}, { "item": "Speaker","price": 95},
     { "item": "Spliter", "price": 43,}, {"item": "screen", "price": 1300,}, {  "item": "TV","price": 2300,},
     { "item": "Mouse","price": 60,},{ "item": "Extender",  "price": 23,}];
var tel_aviv_add = [{
    "city": "Tel Aviv", "street": "Bograshov","number": 3}, {"city": "Tel Aviv", "street": "King george","number": 101},
    {"city": "Tel Aviv", "street": "Rothschild","number": 14},{"city": "Tel Aviv", "street": "nordau","number": 20},
    {"city": "Tel Aviv", "street": "dizengoff ","number": 56}, {"city": "jaffa", "street": "Ajami","number": 9},
    {"city": "jaffa", "street": "Yefet","number": 76}];
var Haifa_add = [{
    "city": "Haifa", "street": "neve shaanan","number": 43}, {"city": "Haifa", "street": "givat zemer","number": 129},
    {"city": "nesher", "street": "dvora","number": 4},{"city": "Kiryat Bialik", "street": "tamar","number": 15},
    {"city": "Or Akiva", "street": "golan ","number": 44}, {"city": "tirat hacarmel", "street": "bialik","number": 58},
    {"city": "Hadera", "street": "avshalom","number": 76}];
var Jerusalem_add = [{
    "city": "Bet Shemesh", "street": "nehemiah","number": 2}, {"city": "Jerusalem", "street": "king david","number": 145},
    {"city": "Jerusalem", "street": "mea shearim","number": 47},{"city": "Jerusalem", "street": "hillel","number": 33},
    {"city": "Jerusalem", "street": "yafo ","number": 122}, {"city": "Jerusalem", "street": "strauss","number": 89},
    {"city": "Jerusalem", "street": "agripas","number": 16}];
var West_Bank_add = [{
    "city": "Ariel", "street": "yefe nof","number": 23}, {"city": "Ariel", "street": "yftach","number": 61},
    {"city": "Ariel", "street": "hagalil","number": 117},{"city": "Efrat", "street": "hazit","number": 40},
    {"city": "givat zeev", "street": "odom" ,"number": 3}, {"city": "Elkana", "street": "tapoach","number": 91},
    {"city": "Kdomim", "street": "yahalom","number": 9}];
var Central_add = [{
    "city": "Modiin", "street": "nachal tzofar","number": 23}, {"city": "Lod", "street": "hanasi","number": 10},
    {"city": "kfar Sabah", "street": "hanegev","number": 64},{"city": "Ramla", "street": "sapir","number": 245},
    {"city": "Rehovot", "street": "argaman" ,"number":13}, {"city": "Netanya", "street": "admonit","number": 71},
    {"city": "Gezer", "street": "pedaya","number": 9}];
var South_add = [{
    "city": "Eilat", "street": "snapir","number": 3}, {"city": "Mitzpe ramon", "street": "hachatzav","number": 52},
    {"city": "Arad", "street": "ofek","number": 44},{"city": "Sderot", "street": "weitzman","number": 30},
    {"city": "Beer Sheva", "street": "arlozorov" ,"number":189}, {"city": "Dimona", "street": "dogit","number": 11},
    {"city": "Ashdod", "street": "sinai","number": 976}];
var North_add = [{
    "city": "Tzfat", "street": "tzahal","number": 62}, {"city": "Afola", "street": "bialik","number": 5},
    {"city": "Sakhnin", "street": "rakefet","number": 31},{"city": "Nahariya", "street": "kaplan","number": 50},
    {"city": "Carmiel", "street": "arbel" ,"number":189}, {"city": "Rosh pina", "street": "hen","number": 11},
    {"city": "Shlomi", "street": "dror","number": 83}];

    package_Simulator();
    console.log("finish1");
    console.log("finish2");

function package_Simulator() {
    corrent_package.tracking_number = get_track_number();
    var num_items  = Math.floor(Math.random() * max_items) + 1;
    insert_items(num_items);
    if (num_items < 3)
    {
        corrent_package.size = "small";
    }
    else if ( num_items < 8)
    {
        corrent_package.size = "medium";
    }
    else
    {
        corrent_package.size = "big";
    }
    var num_district  = Math.floor(Math.random() * district) + 1;
    get_distract_and_address(num_district);

    }
function get_track_number() { // get a uniqe number for the package tracking number
    return ("0" + cur_date.getDay() + cur_date.getMonth() + cur_date.getUTCFullYear() + cur_date.getMilliseconds() + cur_date.getSeconds() + cur_date.getMinutes() + cur_date.getHours());
}
function insert_items(num_item) { // insert items to the package 
    corrent_package.itemes_list = [];
    for (let index = 0; index < num_item; index++) {
        let cur_index = Math.floor(Math.random() * items.length);
        corrent_package.itemes_list.push(items[cur_index]);
  }
}
function get_distract_and_address(district_num) { // get the district and random an address
    var address_num  = Math.floor(Math.random() * (district-1)) ;
    switch (district_num) {
        case 1:
          corrent_package.district = "Tel Aviv";
          corrent_package.address = tel_aviv_add[address_num];
          break;
        case 2:
          corrent_package.district = "Haifa";
          corrent_package.address = Haifa_add[address_num];
          break;
        case 3:
          corrent_package.district = "Jerusalem";
          corrent_package.address = Jerusalem_add[address_num];
          break;
        case 4:
          corrent_package.district = "West Bank";
          corrent_package.address = West_Bank_add[address_num];
          break;
        case 5:
          corrent_package.district = "Central";
          corrent_package.address = Central_add[address_num];
          break;
        case 6:
          corrent_package.district = "South";
          corrent_package.address = South_add[address_num];
          break;
        case 7:
          corrent_package.district = "North";
          corrent_package.address = North_add[address_num];
          break;
      }
}

  
