var session = require('express-session');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'countersesh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
}));

app.get('/', function (request, response) {
  if (request.session.counter) {
    request.session.counter++;
  } else {
    request.session.counter = 1;
  }

  response.render('index', { counter: request.session.counter });
});

app.post('/increment', function (request, response) {
    if (request.session.counter) {
      request.session.counter += 1;
    }

    response.redirect('/');
  });

app.post('/clear', function (request, response) {
    request.session.destroy();

    response.redirect('/');
  });

app.listen(8000, function () {
  console.log('listening to port 8000');
});
