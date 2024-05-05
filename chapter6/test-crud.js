require('dotenv').config({ path: '../.env' });

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test', {
        authSource: 'admin', // means set authenticationDatabase to admin.
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD
    });
}

mongoose.connection.on('open', async () => {
    // person 스키마 + 컬렉션 만들기
    const personSchema = new mongoose.Schema({
        name: String,
        age: Number
    });
    const Person = mongoose.model('person', personSchema);

    // 문서 하나 추가
    await Person.create({ name: 'Andy', age: 30 });
    console.log('문서 추가 완료');

    // 문서 찾기
    const documents = await Person.find({ name: 'Andy' });
    console.log('찾은 문서:', documents);

    // 문서 갱신하기
    await Person.updateMany({ name: 'Andy' }, { $set: { age: 20 } });
    console.log('문서 업데이트');

    // 갱신된 문서 확인하기
    const updatedDocuments = await Person.find({ name: 'Andy' });
    console.log('갱신된 문서: ', updatedDocuments);

    // 연결 끊기
    await mongoose.connection.close();
});
