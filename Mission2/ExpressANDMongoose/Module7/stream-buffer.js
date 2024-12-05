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


