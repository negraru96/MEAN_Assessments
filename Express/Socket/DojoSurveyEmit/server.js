var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
var server = app.listen(8000);
var io = require('socket.io').listen(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

io.on('connection', function (socket) {
    socket.on('posting_form', function (data) {
      socket.emit('updated_message', {
          response: 'You emitted the following information to the server: ',
          info: data,
        });
      socket.emit('random_number', {
          response: 'Your lucky number emitted by the server is ',
          numb: Math.floor(Math.random() * 1000),
        });
    });
  });

app.get('/', function (request, response) {
    response.render('index');
  });
