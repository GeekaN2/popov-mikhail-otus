const http = require('http');
const port = 3000;
const hostname = 'localhost';
var counter = 0;
const server = http.createServer()

server.on('request', (req, res) => { 
    counter++;
    let message = `Accepted request ${counter}`;
    console.log(`${counter}: successful request`);
    setTimeout(() => res.end(message), 100);
});

server.listen(port, hostname, () => {
    console.log(`Server running ${hostname}:${port}`);
})