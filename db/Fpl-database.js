
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/database';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});


var db = mongoose.connection;


db.once('open', () => console.log('Connected to MongoLab instance.'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));