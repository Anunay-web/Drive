const mongoose = require('mongoose');

function ConnectDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('Database connected successfully');
    })
}

module.exports = ConnectDB;