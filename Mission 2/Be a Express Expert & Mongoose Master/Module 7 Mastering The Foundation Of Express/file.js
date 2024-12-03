const fs = require('fs');


// reading a text file

const readText = fs.readFileSync('./text/read.txt','utf-8');

console.log(readText  );


const writeText = fs.writeFileSync('./text/write.txt', 'Hello World');

