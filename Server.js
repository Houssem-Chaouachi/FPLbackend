const express = require('express');
const app = express();
const user = require('../FPL-backend/Api/UserApi')
const sondage = require('./Api/Sondage')
const bodyParser = require('body-parser')
const db = require('../FPL-backend/db/Fpl-database')
const cors = require('cors');
require('./config/passport');
// const postLimit = require ('./rateLimiter')
const port = 3000



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


app.use('/user', user);
app.use('/sondage',sondage);

app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`);
})
