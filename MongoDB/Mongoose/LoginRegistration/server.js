var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/client/static'));
app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');

app.use(session({
  secret: 'LoginReg',
}));

var router = require('./server/config/routes.js');
router(app);

app.listen(8000, function () {
  console.log('listening to port 8000');
});
