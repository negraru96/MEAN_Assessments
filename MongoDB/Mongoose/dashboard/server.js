var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/shark_key', {useMongoClient: true});

var SharkSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  color: String,
  location: String,
}, { timestamps: true });
mongoose.model('Shark', SharkSchema);
var Shark = mongoose.model('Shark');

app.get('/', function (req, res) {
          res.render('index');
        });

app.get('/posted', function (req, res) {
          Shark.find({}, function (err, results) {
            res.render('posted', { shark: results });
          }).sort({ _id: -1 });
        });

app.post('/create', function (req, res) {
  console.log('POST DATA', req.body);
  var newShark = new Shark ({
  name: req.body.name,
  weight: req.body.weight,
  color: req.body.color,
  location: req.body.location,
});
  newShark.save(function (err) {
    if (err) {
      console.log('Something went wrong');
      res.redirect('/');
    } else{
      console.log('successfully posted');
      res.redirect('/');
    }
  });
});

app.listen(8000, function () {
  console.log('listening to port 8000');
});
