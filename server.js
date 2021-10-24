const express = require('express')
const app = express();
const socketIO = require('socket.io');


const port = 3000;

var numOfPack = [
  Tel_Aviv = 0, Haifa = 0, Jerusalem = 0, West_Bank = 0, Central = 0, South = 0, North = 0
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



app.use(express.static('public'))

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

function view_function(package_per_dis, district_size, district_tax) {
  numOfPack = package_per_dis;
  packSize = district_size;
  packtax = district_tax;
}

function update_jeneral(up_general) {
  general_info=up_general; 
}

app.get('/statistics.ejs', (req, res) => {
  var data={
    dis: [
      { districtId: "haifa", title: "HAIFA", value: general_info[0][1] },
      { districtId: "north", title: "NORTH", value: general_info[0][6] },
      { districtId: "central", title: "CENTRAL", value: general_info[0][4] },
      { districtId: "south", title: "SOUTH", value: general_info[0][5] },
      { districtId: "jerusalem", title: "JERUSALEM", value: general_info[0][2]},
      { districtId: "tel-aviv", title: "TEL-AVIV", value: general_info[0][0] },
      { districtId: "west-bank", title: "WEST-BENK", value: general_info[0][3] },
    ],
    size:[
      { title: 'small', value:general_info[1][0]},
      { title: 'medium', value:general_info[1][1]  },
      { title: 'large', value:general_info[1][2]  },
    ]
  }

  res.render("pages/statistics",data);
});

app.get('/products.ejs', (req, res) => {
  res.render("pages/products");
});

app.get('/recomendations.ejs', (req, res) => {
  res.render("pages/recomendation");
});





app.get('/setData/:districtId/:value', function (req, res) {
  io.emit('newdata', { districtId: req.params.districtId, value: req.params.value })
  res.send(req.params.value)
})



const server = express()
  .use(app)
  .listen(3000, () => console.log(`Listening Socket on http://localhost:3000/dashboard.ejs`));
const io = socketIO(server);

//------------
// io.on('connection', (socket) => {  
//   socket.on('newdata', (msg) => {
//     console.log(msg);
//     io.emit('newdata', msg);
//   });
// });
//-----------

module.exports = { view_function };