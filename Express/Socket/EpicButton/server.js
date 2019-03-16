var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var server = app.listen(8000);
var io = require('socket.io').listen(server);

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

io.sockets.on('connection', function (socket) {
      var count = 0;
      socket.on('button1', function (data) {
                count++;
                socket.emit('button_message', { count: count });
              });

      socket.on('reset', function (data) {
          count = 0;
          socket.emit('button_message', { count: count });
        });
    });

app.get('/', function (request, response) {
          response.render('index');
        });
