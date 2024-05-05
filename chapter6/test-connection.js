require('dotenv').config();

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test', {
        authSource: 'admin', // means set authenticationDatabase to admin.
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD
    }); // If your database has auth enabled

}

mongoose.connection.on('open', async () => {
    const adminDB = mongoose.connection.db.admin();
    const listDatabases = await adminDB.listDatabases();
    console.log(listDatabases);
});
