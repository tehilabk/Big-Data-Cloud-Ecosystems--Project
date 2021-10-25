//include file system modul
const { SSL_OP_TLS_D5_BUG } = require('constants');
const fs = require('fs');
var list =[];

try {
    
    const rowdata = fs.readFileSync('./dataset.json', 'utf8');

    // parse JSON string to JSON object
    const data = JSON.parse(rowdata);


    var items = data['object']['associations']['items'];
   
    data['object']['associations']['rules'].map(obj => {
        var products=[];
        var lhs=obj['lhs'];
        var rhs=obj['rhs'];

        
        lhs.forEach(element => {
            products.push(items[element].name); 
        });
        
        rhs.forEach(element=>{
            products.push(items[element].name); 
        });

        var conf = obj['confidence'];
        var sup = obj['support'][0];
         
        var t=[{"products":products,"conf":conf,"sup":sup}];
        list.push(t);
        
        
    });
   
    

} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}