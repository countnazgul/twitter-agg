var fs = require('fs');
fs.readFile('blocked.txt', function(err, data) {
   console.log(data.toString()) 
});