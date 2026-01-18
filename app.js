const express = require('express');
const userRoute = require('./routes/user.routes')
const dotenv = require('dotenv');
dotenv.config();
const ConnectDB = require("./config/db");
ConnectDB();
const cookieParser = require('cookie-parser');
const indexRoute = require('./routes/index.routes');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use('/',indexRoute);    
app.use('/user',userRoute);


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});