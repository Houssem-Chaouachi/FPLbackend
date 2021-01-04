const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const db = require('../FPL-backend/db/Fpl-database')
const cors = require('cors')
const port = 3000


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
console.log(cors());
app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`);
})
