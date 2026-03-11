const http = require('http');

const hostname = 'localhost';
const port = 8000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('content-Type', 'text/plain');
    res.end('Hello again, this time from vsCode');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:$[port]/`);
});