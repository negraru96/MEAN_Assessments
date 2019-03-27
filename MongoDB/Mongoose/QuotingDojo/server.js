var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/basic_mongoose');

var QuoteSchema = new mongoose.Schema({
  name: String,
  line: String,
}, { timestamps: true });
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');

app.get('/', function (req, res) {
          res.render('index');
        });

app.get('/quotes', function (req, res) {
  Quote.find({}, function (err, quotes) {
      res.render('quotes', { arr: quotes });
    }).sort({ _id: -1 });
});

app.post('/add', function (req, res) {
  console.log('POST DATA', req.body);
  var newQuote = new Quote({
      name: req.body.name,
      line: req.body.line,
    });
  newQuote.save(function (err) {
    if (err) {
      console.log('something went wrong');
    } else {
      console.log('successfully added a quote');
      res.redirect('/quotes');
    }
  });
});

var server = app.listen(8000, function () {
  console.log('listening to port 8000');
});
