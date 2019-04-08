var mongoose = require('mongoose');
var session = require('express-session');
var User = mongoose.model('User');
var users = require('../controller/users.js');

module.exports = function (app) {

app.get('/', function (req, res) {
  if(session.user === undefined){
    res.render('login', {errors: session.errors});
  }
  else{
      res.render('index', {user: session.user});
  }
});

app.post('/register', function(req, res){
  users.register(req, res);
  });

app.post('/login', function(req, res){
  users.login(req, res);
});

app.get('/logout', function (req, res) {
  session.user = undefined;
  res.redirect('/');
});
};
