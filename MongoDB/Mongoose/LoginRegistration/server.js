var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/LoginReg', {useNewUrlParser: true});

var Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));

app.use(session({
  secret: 'LoginReg',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/yo', function (req, res) {
  res.render('Registration');
});

app.listen(8000, function () {
  console.log('listening to port 8000');
});
