const express = require('express')
const app = express();
const socketIO = require('socket.io');


const port = 3000;

var numOfPack = [
  Tel_Aviv = 2, Haifa = 3, Jerusalem = 1, West_Bank = 3, Central = 1, South = 2, North = 1
];
var packSize = [Tel_Aviv = [small = 1, medium = 0, big = 1], Haifa = [small = 1, medium = 1, big = 1],
Jerusalem = [small = 1, medium = 0, big = 0], West_Bank = [small = 3, medium = 0, big = 0],
Central = [small =1, medium = 0, big = 0], South = [small = 1, medium = 1, big = 0],
North = [small = 1, medium = 0, big = 0]];

var packtax = [Tel_Aviv = [low_75 = 1, low_500 = 0, high_500 = 1], Haifa = [low_75 = 1, low_500 = 1, high_500 = 1],
Jerusalem = [low_75 = 1, low_500 = 0, high_500 = 0], West_Bank = [low_75 = 1, low_500 = 2, high_500 = 0],
Central = [low_75 = 1, low_500 = 0, high_500 = 0], South = [low_75 = 0, low_500 = 1, high_500 = 1],
North = [low_75 = 1, low_500 = 0, high_500 = 0]];

var general_info = [package_count = [Tel_Aviv = 50, Haifa = 20, Jerusalem = 50, West_Bank = 40, Central = 56, South = 80, North = 34],
size_count = [small = 47, medium = 89, big = 78]];

var bigml_obj =[ 
  {product:["hdmi","Headphone"],conf:0.08746,sup:0.0666},{product:["Smartwatch","Auxcable"],conf:0.0864,sup:0.0526},
  {product:["Mousepad","Diskonkey"],conf:0.07546,sup:0.04214},{product:["Phonecharger","Xbox"],conf:0.07124,sup:0.04115}
  ,{product:["hdmi","Phonecharger"],conf:0.0755,sup:0.03232},{product:["Speaker","Diskonkey"],conf:0.07334,sup:0.031565}
  ,{product:["Spliter","screen"],conf:0.06434,sup:0.0294646},{product:["Mousepad","Smartwatch"],conf:0.062554,sup:0.02743}
  ,{product:["Speaker","TV"],conf:0.060023,sup:0.0263453},{product:["Headphone","Mouse"],conf:0.05676,sup:0.025353}
  ,{product:["Xbox","Diskonke"],conf:0.05423,sup:0.02346},{product:["Phonecharger","Auxcable"],conf:0.05103,sup:0.02244}
  ,{product:["Mouse","hdmi"],conf:0.04872,sup:0.020453},{product:["hdmi","Extender"],conf:0.043232,sup:0.01924}
  ,{product:["Headphone","TV"],conf:0.04223,sup:0.015475}];

app.use(express.static('public'))
app.use(express.json())

app.set('view engine', 'ejs')

app.get('/dashboard.ejs', (req, res) => {
  var data = {
    cards: [
      { districtId: "haifa", title: "HAIFA", value: numOfPack[1], unit: "packages", fotterIcon: "", fotterText: "currently sending", icon: "location_city" },
      { districtId: "north", title: "NORTH", value: numOfPack[6], unit: "packages", fotterIcon: "", fotterText: "currently sending", icon: "cloud_queue" },
      { districtId: "central", title: "CENTRAL", value: numOfPack[4], unit: "packages", fotterIcon: "", fotterText: "currently sending", icon: "time_to_leave" },
      { districtId: "south", title: "SOUTH", value: numOfPack[5], unit: "packages", fotterIcon: "", fotterText: "currently sending", icon: "filter_hdr" },
      { districtId: "jerusalem", title: "JERUSALEM", value: numOfPack[2], unit: "packages", fotterIcon: "", fotterText: "currently sending", icon: "account_balance" },
      { districtId: "tel-aviv", title: "TEL-AVIV", value: numOfPack[0], unit: "packages", fotterIcon: "", fotterText: "currently sending", icon: "domain" },
      { districtId: "west-bank", title: "WEST-BENK", value: numOfPack[3], unit: "packages", fotterIcon: "", fotterText: "currently sending", icon: "filter_b_and_w" }
    ],
    sizes: [
      { title: 'center', small: packSize[4][0], medium: packSize[4][1], large: packSize[4][2] },
      { title: 'north', small: packSize[6][0], medium: packSize[6][1], large: packSize[6][2] },
      { title: 'south', small: packSize[5][0], medium: packSize[5][1], large: packSize[5][2] },
      { title: 'hifa', small: packSize[1][0], medium: packSize[1][1], large: packSize[1][2] },
      { title: 'jerusalem', small: packSize[2][0], medium: packSize[2][1], large: packSize[2][2] },
      { title: 'Tel-aviv', small: packSize[0][0], medium: packSize[0][1], large: packSize[0][2] },
      { title: 'West-Bank', small: packSize[3][0], medium: packSize[3][1], large: packSize[3][2] },
    ],

    tax: [
      { title: 'center', low75: packtax[4][0], low500: packtax[4][1], high: packtax[4][2] },
      { title: 'north', low75: packtax[6][0], low500: packtax[6][1], high: packtax[6][2] },
      { title: 'south', low75: packtax[5][0], low500: packtax[5][1], high: packtax[5][2] },
      { title: 'hifa', low75: packtax[1][0], low500: packtax[1][1], high: packtax[1][2] },
      { title: 'jerusalem', low75: packtax[2][0], low500: packtax[2][1], high: packtax[2][2] },
      { title: 'Tel-aviv', low75: packtax[0][0], low500: packtax[0][1], high: packtax[0][2] },
      { title: 'West-Bank', low75: packtax[3][0], low500: packtax[3][1], high: packtax[3][2] },
    ]

  }

  res.render("pages/dashboard", data)


})

app.get('/statistics.ejs', (req, res) => {
  var data = {
    dis: [
      { districtId: "haifa", title: "HAIFA", value: general_info[0][1] },
      { districtId: "north", title: "NORTH", value: general_info[0][6] },
      { districtId: "central", title: "CENTRAL", value: general_info[0][4] },
      { districtId: "south", title: "SOUTH", value: general_info[0][5] },
      { districtId: "jerusalem", title: "JERUSALEM", value: general_info[0][2] },
      { districtId: "tel-aviv", title: "TEL-AVIV", value: general_info[0][0] },
      { districtId: "west-bank", title: "WEST-BENK", value: general_info[0][3] },
    ],
    size: [
      { title: 'small', value: general_info[1][0] },
      { title: 'medium', value: general_info[1][1] },
      { title: 'large', value: general_info[1][2] },
    ]
  }

  res.render("pages/statistics", data);
});

app.post("/update_data", (req, res) => {
  const body = req.body;
  var pack = JSON.parse(body.package);
  var dis_pos = get_district(pack.district);
  var item_size = get_pack_size(pack.items_list.length);
  var tax_tag = pack.tax_tag;
  numOfPack[dis_pos] ++;
  packSize[dis_pos][item_size] ++;
 packtax[dis_pos][tax_tag] ++;


})
app.post("/delete_all", (res) => {
  for (let index = 0; index < numOfPack.length; index++) {
    numOfPack[index] = 0; 
  }
  for (let i = 0; i < packSize.length; i++) {
    for (let j = 0; j < 3; j++) {
      packSize[i][j] = 0;
    }
  }
  for (let i = 0; i < packtax.length; i++) {
    for (let j = 0; j < 3; j++) {
     packtax[i][j] = 0;
    }
  }
})
app.post("/statistic_data", (req, res) => {
  const body = req.body;
  var pack = JSON.parse(body.package);
  general_info = pack;
})
app.post("/update_bigml", (req, res) => {
  const body = req.body;

  var pack= JSON.parse(body.package);
 

  for(let i=0;i<bigml_obj.length;i++){
    for(let j=0 ;j<bigml_obj[i].product.length ; j++){
      
      bigml_obj[i].product[j]=pack[i].products[j];
    }
     
    bigml_obj[i].conf=pack[i].conf;
    bigml_obj[i].sup=pack[i].sup;
  }


})
app.get('/recomendations.ejs', (req, res) => {
  var data={
    bigml_list:[
      [product=bigml_obj[0].product,sup=bigml_obj[0].sup,conf=bigml_obj[0].conf],
      [product=bigml_obj[1].product,sup=bigml_obj[1].sup,conf=bigml_obj[1].conf],
      [product=bigml_obj[2].product,sup=bigml_obj[2].sup,conf=bigml_obj[2].conf],
      [product=bigml_obj[3].product,sup=bigml_obj[3].sup,conf=bigml_obj[3].conf],
      [product=bigml_obj[4].product,sup=bigml_obj[4].sup,conf=bigml_obj[4].conf],
      [product=bigml_obj[5].product,sup=bigml_obj[5].sup,conf=bigml_obj[5].conf],
      [product=bigml_obj[6].product,sup=bigml_obj[6].sup,conf=bigml_obj[6].conf],
      [product=bigml_obj[7].product,sup=bigml_obj[7].sup,conf=bigml_obj[7].conf],
      [product=bigml_obj[8].product,sup=bigml_obj[8].sup,conf=bigml_obj[8].conf],
      [product=bigml_obj[9].product,sup=bigml_obj[9].sup,conf=bigml_obj[9].conf],
      [product=bigml_obj[10].product,sup=bigml_obj[10].sup,conf=bigml_obj[10].conf],
      [product=bigml_obj[11].product,sup=bigml_obj[11].sup,conf=bigml_obj[11].conf],
      [product=bigml_obj[12].product,sup=bigml_obj[12].sup,conf=bigml_obj[12].conf],
      [product=bigml_obj[13].product,sup=bigml_obj[13].sup,conf=bigml_obj[13].conf],
      [product=bigml_obj[14].product,sup=bigml_obj[14].sup,conf=bigml_obj[14].conf],
    ]
  }





  res.render("pages/recomendation",data);
});

app.get('/products.ejs', (req, res) => {
  res.render("pages/products");
});





app.get('/setData/:districtId/:value', function (req, res) {
  io.emit('newdata', { districtId: req.params.districtId, value: req.params.value })
  res.send(req.params.value)
})

function get_pack_size(items_size) {
  var size;
  if (items_size <= 3) {
    size = 0;
  }
  else if (items_size <= 7) {
    size = 1;
  }
  else {
    size = 2;
  }
  return size;
}

function get_district(district_name) {
  var district;
  switch (district_name) {
    case "Tel Aviv":
      district = 0;
      break;
    case "Haifa":
      district = 1;
      break;
    case "Jerusalem":
      district = 2;
      break;
    case "West Bank":
      district = 3;
      break;
    case "Central":
      district = 4;
      break;
    case "South":
      district = 5;
      break;
    case "North":
      district = 6;
      break;
  }
  return district;
}


const server = express()
  .use(app)
  .listen(3000, () => console.log(`Listening Socket on http://localhost:3000/dashboard.ejs`));
const io = socketIO(server);



