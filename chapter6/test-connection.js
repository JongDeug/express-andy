require('dotenv').config();
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`mongodb://127.0.0.1:27017/study`, {
        authSource: 'admin',
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD
    }); //if your database has auth enabled
    // 옼케이!! "auth": { "authSource": "admin" } means set authenticationDatabase to admin.

    const kittySchema = new mongoose.Schema({
        name: String
    });

    const Kitten = mongoose.model('Kitten', kittySchema);

    const silence = new Kitten({ name: 'Silence' });
    console.log(silence.name); // 'Silence'
}
