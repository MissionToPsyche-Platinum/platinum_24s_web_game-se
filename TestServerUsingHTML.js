const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 8000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html'});

    const htmlFilePath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(htmlFilePath);

    readStream.on('error', (err) => {
        res.writeHead(404, { 'Content-Type': 'text/plain'});
        res.end('error: 404 not found');
    });

    readStream.pipe(res);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});