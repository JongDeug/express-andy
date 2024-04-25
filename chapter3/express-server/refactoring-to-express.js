const url = require('url');
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => console.log(`익스프레스로 라우터 리팩터링하기`));

app.get('/', (_, res) => res.end('HOME'));
app.get('/user', user);
app.get('/feed', feed);

// const, let, 함수 표현식, 클래스 표현식은 호이스팅 되지 않음. 따라서 const user = (req,res) => {} 이런 표현식은 안됨.
function user(req, res) {
    const user = url.parse(req.url, true).query;
    res.json(`[user] name: ${user.name}, age: ${user.age}`);
}

function feed(_, res) {
    res.json(`
    <ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
    </ul>`);
}
