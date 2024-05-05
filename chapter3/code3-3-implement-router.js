const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // 여기는 먼저 실행이 안됨. req가 와야 실행됨. 따라서 호이스팅이 되지 않아도 초기화가 이미 돼있기 때문에 OK
    if (path === '/user') user(req, res);
    else if (path === '/feed') feed(req, res);
    else notFound(req, res);
})
    .listen('3000', () => console.log('라우터를 만들어보자'));

const user = (req, res) => {
    res.end('[user] name : 종환, age: 27');
};

const feed = (req, res) => {
    res.end(`
        <ul>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li>
        </ul>
        `);
};

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end('404 page not found');
};