What is node js
why it is popular
how js works in server
cons of using nodejs
nodejs architecture
Dependencies of Node Js -> V8 and libuv with explanation
   ---> Event Loop
   ---> THread Pool

What is a module
what is IIFE
Difference between commonjs and esm
   ---> Local module
   --->Built in module <- with proper example like: path , fs ,
   --->Third party modules
         for fs give example of readFIle , readFileSync , writeFile, writeSyncFile --> [


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


         ]

Event Driven Architecture
Event Emitter - Event Listener - Callback

Stream and Buffer why and how it used .
Different types of Streams
   --->>> Example or explation: [
      const http = require('http');
const fs = require('fs');

//  create a server with raw nodejs

const server = http.createServer();

server.on('request', (req,res) =>{
    if(req.url==='/read-file' &&  req.method === 'GET'){
    const readableStream = fs.createReadStream('./text/read.txt');

    readableStream.on('data', (  buffer )=>{
        res.statusCode = 200;
        res.write(buffer);
    })
    readableStream.on('end', ()=>{
        res.statusCode = 200;
        res.end("File read successfully");
    })

    readableStream.on('error', (err)=>{
        res.statusCode = 500;
        res.end("File not found");
    })
    }

})


server.listen(3000, () => {
    console.log('Server is running on port 3000');
})




]





