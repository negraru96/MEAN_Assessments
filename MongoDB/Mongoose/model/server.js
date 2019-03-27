var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));

mongoose.connect('mongodb://localhost/basic_mongoose');

app.get('/', function (req, res) {
          res.render('index');
        });

app.post('/users', function (req, res) {
  console.log('POST DATA', req.body);
  var user = new User({ name: req.body.name, age: req.body.age });
  user.save(function (err) {
    if (err) {
      console.log('something went wrong');
    } else {
      console.log('successfully added a user');
    }

    res.redirect('/');
  });
});

app.post('/users', function (req, res) {
  User.find({}, function (err, users) {
    user.save(function (err) {
      if (err) {
        console.log('error');
      } else {
        console.log('success');
      }
    });
  });
});

var UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

var server = app.listen(8000, function () {
          console.log('listening on port 8000');
        });
