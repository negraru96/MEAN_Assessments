var bodyParser = require('body-parser');
var express = require('express');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (request, response) {
  response.render('index');
});

app.post('/results', function (request, response) {
  response.render('created', { info: request.body });
});

app.listen(8000, function () {
  console.log('listening to port 8000');
});
