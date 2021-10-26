const express = require('express')
const app = express();
const socketIO = require('socket.io');


const port = 3000;

var numOfPack = [
  Tel_Aviv = 5, Haifa = 0, Jerusalem = 0, West_Bank = 0, Central = 0, South = 0, North = 0
];
var packSize = [Tel_Aviv = [small = 33, medium = 80, big = 827], Haifa = [small = 0, medium = 0, big = 0],
Jerusalem = [small = 0, medium = 0, big = 0], West_Bank = [small = 0, medium = 0, big = 0],
Central = [small = 3, medium = 3, big = 3], South = [small = 0, medium = 0, big = 0],
North = [small = 0, medium = 0, big = 0]];

var packtax = [Tel_Aviv = [low_75 = 0, low_500 = 0, high_500 = 0], Haifa = [low_75 = 0, low_500 = 0, high_500 = 0],
Jerusalem = [low_75 = 0, low_500 = 0, high_500 = 0], West_Bank = [low_75 = 0, low_500 = 0, high_500 = 0],
Central = [low_75 = 0, low_500 = 0, high_500 = 0], South = [low_75 = 0, low_500 = 0, high_500 = 0],
North = [low_75 = 0, low_500 = 0, high_500 = 0]];

var general_info = [package_count = [Tel_Aviv = 0, Haifa = 0, Jerusalem = 0, West_Bank = 0, Central = 0, South = 0, North = 0],
size_count = [small = 0, medium = 0, big = 0]];

var bigml_obj =[ 
  {product:["hdmi","hell"],conf:0,sup:0},{product:["hdmi","hell"],conf:0,sup:0},
  {product:["hdmi","hell"],conf:0,sup:0},{product:["hdmi","hell"],conf:0,sup:0}
  ,{product:["hdmi","hell"],conf:0,sup:0},{product:["hdmi","hell"],conf:0,sup:0}
  ,{product:["hdmi","hell"],conf:0,sup:0},{product:["hdmi","hell"],conf:0,sup:0}
  ,{product:["hdmi","hell"],conf:0,sup:0},{product:["hdmi","hell"],conf:0,sup:0}
  ,{product:["hdmi","hell"],conf:0,sup:0},{product:["hdmi","hell"],conf:0,sup:0}
  ,{product:["hdmi","hell"],conf:0,sup:0},{product:["hdmi","hell"],conf:0,sup:0}
  ,{product:["hdmi","hell"],conf:0,sup:0}];

app.use(express.static('public'))
app.use(express.json())

app.set('view engine', 'ejs')

app.get('/dashboard.ejs', (req, res) => {
  var data = {
    cards: [
      { districtId: "haifa", title: "HAIFA", value: numOfPack[1], unit: "packages", fotterIcon: "", fotterText: "נפח ממוצע", icon: "location_city" },
      { districtId: "north", title: "NORTH", value: numOfPack[6], unit: "packages", fotterIcon: "", fotterText: "נפח ממוצע", icon: "cloud_queue" },
      { districtId: "central", title: "CENTRAL", value: numOfPack[4], unit: "packages", fotterIcon: "", fotterText: "נפח ממוצע", icon: "time_to_leave" },
      { districtId: "south", title: "SOUTH", value: numOfPack[5], unit: "packages", fotterIcon: "", fotterText: "נפח ממוצע", icon: "filter_hdr" },
      { districtId: "jerusalem", title: "JERUSALEM", value: numOfPack[2], unit: "packages", fotterIcon: "", fotterText: "נפח ממוצע", icon: "account_balance" },
      { districtId: "tel-aviv", title: "TEL-AVIV", value: numOfPack[0], unit: "packages", fotterIcon: "", fotterText: "נפח ממוצע", icon: "domain" },
      { districtId: "west-bank", title: "WEST-BENK", value: numOfPack[3], unit: "packages", fotterIcon: "", fotterText: "נפח ממוצע", icon: "filter_b_and_w" }
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
  console.log("start delete !!!!!!!!!!!!!!!!!!!!!!!!!")
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
  var pack = JSON.parse(body.package);
  bigml_obj = pack;
})
app.get('/recomendations.ejs', (req, res) => {
  // var data={
  //   bigml:[
  //     {list:[],conf:,sup:},


  //   ]




  // }





  res.render("pages/recomendation");
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



