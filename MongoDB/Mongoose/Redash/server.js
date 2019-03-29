var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shark_key', {useMongoClient: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var SharkSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 2 },
  weight: {type: Number, required: true, minlength: 2 },
  color: {type: String, required: true, minlength: 2 },
  location: {type: String, required: true, minlength: 2 },
}, { timestamps: true });
mongoose.model('Shark', SharkSchema);
var Shark = mongoose.model('Shark');

app.get('/', function (req, res) {
  arr = Shark.find({}, function(err, sharks) {
    res.render('index', { arr: sharks});
  });
});
app.get('/sharks/new', function(req, res) {
  res.render('new');
});

app.post('/add', function (req, res) {
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

app.get('sharks/edit/:id', function(req, res) {
  shar = Shark.findOne({_id: req.params.id}, function(err, shark) {
    console.log(shark);
    res.render('edit', {shar:shark});
  });
});

app.post('/change/:id', function(req, res) {
  console.log('POST DATA', req.body);
  Shark.update({_id: req.params.id},
    {name: req.body.name,
    weight: req.body.weight,
    color: req.body.color,
    location: req.body.location},
    function(err) {
      if(err) {
        console.log('something went wrong');
        res.redirect(`/sharks/edit/${req.params.id}`);
      } else {
        console.log('success');
        res.redirect(`/sharks/${req.params.id}`);
      }
    });
});

app.post('/delete/:id', function(req, res) {
  Shark.remove({_id: req.params.id}, function(err){
    console.log('RECORD DELETED');
    res.redirect('/');
  });
});

app.get('/sharks/:id', function(req, res) {
  shar = Shark.findOne({_id: req.params.id}, function(err, shark) {
    console.log(shark);
    res.render('shark', {shar:shark});
  });
});

app.listen(8000, function () {
  console.log('listening to port 8000');
});
