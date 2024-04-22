const http = require('http');
let count = 0;

const server = http.createServer((req, res) => {
    log(count);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('hello!\n');
    setTimeout(() => {
        res.end('Node.js');
    }, 2000);
});

server.listen(8000, () => console.log('Hello Node.js'));

function log(count) {
    count += 1;
    console.log(count);
}
