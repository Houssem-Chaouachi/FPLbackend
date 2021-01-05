const express = require('express');
const app = express();
const user = require('../FPL-backend/Api/UserApi')
const passport = require('./config/passport')
const bodyParser = require('body-parser')
const db = require('../FPL-backend/db/Fpl-database')
const cors = require('cors')
const port = 3000


// app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.use('/user', user)
app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`);
})
