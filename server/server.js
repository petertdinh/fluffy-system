var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var fs = require('fs');
var app = express();
var router = require('./router');
var mongoose = require('mongoose');

// enter "npm run dev" to start the server with nodemon

//DB
mongoose.connect('mongodb://localhost:test/posts');


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("Successfully connected");
});

//App
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '../client')));
//app.use(bodyParser.json({type: '*/*'}));
router(app);

//Server

var port = process.env.PORT || 3000;
var server = http.createServer(app);
server.listen(port);
console.log('listening on port ', port);

