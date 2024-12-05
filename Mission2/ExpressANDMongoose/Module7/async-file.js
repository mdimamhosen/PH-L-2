
const fs = require('fs');
// Reading file asynchronously
 fs.readFile('./text/read.txt', 'utf-8', (err,data) =>{
    if(err){
        console.log(err);
    }
    console.log(data);
})

// Writing file asynchronously

fs.writeFile('./text/write.txt', 'Hello World', (err) =>{
    if(err){
        console.log(err);
    }
    console.log('File written successfully');
})

fs.appendFile('./text/write.txt', '\nHello World Again', (err) =>{
    if(err){
        console.log(err);
    }
    console.log('File written successfully');
})
