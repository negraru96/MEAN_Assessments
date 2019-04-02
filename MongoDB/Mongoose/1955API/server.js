var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/1955API', { useNewUrlParser: true });
var Schema = mongoose.Schema;

app.use(bodyParser.json());
app.set('view engine', 'ejs');

var NameSchema = new mongoose.Schema({
  name: {type: String, required: true},
}, { timestamps: true });
mongoose.model('Name', NameSchema);
var Name = mongoose.model('Name');

app.get('/', function(req,res){
  Name.find({}, function(err, name){
    if(err){
      console.log('Returned error', err);
      res.json({message: 'Error', err: err});
    }
    else {
      res.json({message: 'Success', name: name});
    }
  });
});

app.get('/new/:name/', function(req, res){
  console.log(req.params.name);
  var user = new Name({
    name: req.params.name,
  });
  user.save(function (err) {
    if (err) {
      console.log('Error adding name');
    } else {
      console.log('successfully added name');
      res.redirect('/');
    }
  });
});

app.get('/remove/:name/', function(req, res){
  Name.remove({name: req.params.name}, function(err, name){
    if(err){
      console.log('Could not delete', err);
      res.json({message: 'Error deleting', err: err});
    }
    else {
      console.log('{message: Success deleting, name: name}');
      res.redirect('/');
    }
  });
});

app.get('/:name/', function(req, res){
  Name.findOne({name: req.params.name}, function(err, name){
    if(err){
      console.log('Returned error', err);
      res.json({message: 'Error displaying name', err: err});
    }
    else {
      res.json({message: 'Successful display', name: name});
    }
});
});

app.listen(8000, function () {
  console.log('listening to port 8000');
});
