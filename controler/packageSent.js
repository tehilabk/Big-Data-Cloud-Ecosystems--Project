const package_run = require('../simulator/package_process.js');
async function sent_packages()
{
 await package_run();
}
for (let index = 0; index < 10; index++) {
   sent_packages();
   
} 
   
