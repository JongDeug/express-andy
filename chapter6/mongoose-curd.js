require('dotenv').config({path: "../.env"});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./person-model');


mongoose.set('strictQuery', false);

app.use(bodyParser.json());
app.listen(3000, async () => {
    console.log('Server started');
    await mongoose.connect('mongodb://127.0.0.1:27017/test', {
        authSource: 'admin', // means set authenticationDatabase to admin.
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD
    }).then(console.log('Connected to MongoDB'));
});

// 모든 person 출력
app.get('/person', async (req, res) => {
    const person = await Person.find({});
    res.send(person);
});

// 특정 이메일로 person 찾기
app.get('/person/:email', async (req, res) => {
    const person = await Person.findOne({ email: req.params.email });
    res.send(person);
});

// person 데이터 추가하기
app.post('/person', async (req, res) => {
    const person = new Person(req.body);
    await person.save();
    res.send(person);
});

// person 데이터 수정하기
app.put('/person/:email', async (req, res) => {
    const person = await Person.findOneAndUpdate(
        { email: req.params.email },
        { $set: req.body },
        { new: true }
    );
    console.log(person);
    res.send(person);
});

app.delete('/person/:email', async (req, res) => {
    await Person.deleteMany({ email: req.params.email });
    res.send({ success: true });
});
