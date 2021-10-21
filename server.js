const express = require('express')
const app = express();
const socketIO = require('socket.io');

const port=3000;

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  var data = {
    cards: [
      {districtId:"haifa", title: "HAIFA", value: 500, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "location_city" },
      {districtId:"north", title: "NORTH", value: 1500, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "cloud_queue" },
      {districtId:"central", title: "CENTRAL", value: 3500, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "time_to_leave" },
      {districtId:"south", title: "SOUTH", value: 700, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "filter_hdr" },
      {districtId:"jerusalem", title: "JERUSALEM", value: 1500, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "account_balance" },
      {districtId:"tel-aviv", title: "TEL-AVIV", value: 3500, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "domain" },
      {districtId:"west-bank", title: "WEST-BENK", value: 700, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "filter_b_and_w" }
    ],
    sizes:[{title:'center',small:5,medium:8,large:50},
    {title:'north',small:5,medium:8,large:50},
    {title:'south',small:5,medium:8,large:50},
    {title:'hifa',small:5,medium:8,large:50},
    {title:'jerusalem',small:5,medium:8,large:50},
    {title:'tel-aviv',small:5,medium:8,large:50},
    {title:'west-bank',small:5,medium:8,large:50},
    
    ]
  }
  res.render("pages/dashboard", data)
  
})

app.get('/statistics', (req, res) => {
  res.render('public/statistics');
 });




app.get('/setData/:districtId/:value', function (req, res) {
  io.emit('newdata',{districtId:req.params.districtId,value:req.params.value})
  res.send(req.params.value)
})



const server = express()
  .use(app)
  .listen(3000, () => console.log(`Listening Socket on http://localhost:3000`));
const io = socketIO(server);

//------------
// io.on('connection', (socket) => {  
//   socket.on('newdata', (msg) => {
//     console.log(msg);
//     io.emit('newdata', msg);
//   });
// });
//-----------

