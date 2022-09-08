const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./config/app');
const router = require('./router');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = config.appPort;

const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// const corsOptions ={
//     origin:'http://localhost:3001', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
app.use(cors()); 
app.use(router);
app.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
})

console.log("Hello world");