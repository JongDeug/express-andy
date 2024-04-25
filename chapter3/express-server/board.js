const express = require('express');
const app = express();
let posts = [];

// middleware
app.use(express.json()); // req.body 사용하고 싶어? 이걸 써야해
app.use(express.urlencoded({ extended: true })); // JSON 미들웨어랑 사용하는데 application/x-www-form-urlencoded 인 경우 파싱

// 목록 가져오기
app.get('/', (req, res) => {
    res.json(posts);
});
// 글 작성하기
app.post('/posts', (req, res) => {
    const { title, name, text } = req.body;

    posts.push({ id: posts.length + 1, title, name, text, createdDt: Date() });
    res.json({ title, name, text });
});
// 글 삭제하기
app.delete('/posts/:id', (req, res) => {
    const id = req.params.id;
    const filteredPosts = posts.filter(post => post.id !== Number(id));
    const isLengthChanged = posts.length !== filteredPosts.length; // 삭제 확인
    posts = filteredPosts;
    if (isLengthChanged) res.json('OK');
    else res.json('NOT CHANGED');
});

app.listen(3000, () => console.log('Welcome posts START!'));