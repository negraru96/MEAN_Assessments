var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');
module.exports = function (app, server){

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
};
