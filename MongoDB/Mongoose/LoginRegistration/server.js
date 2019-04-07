var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/LoginReg', {useNewUrlParser: true});

var Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'LoginReg',
}));

var UserSchema = new mongoose.Schema({
  email: {type: String,
    required: [true, "Enter a valid Email Address"],
  //     validate: { validator: function(value) {
  //                   //return /\G[^@]+@^([/./])+/.\+[(^@^)]+/(.)(.)+\z/.test(value);
  //                   return /@/.test(value);
  //   },
  //   message: 'Enter a real valid Email Address'
  // }
},
  password: {type: String,
    required: [true, "Password must contain at least one of each: a number, uppercase letter and special character and must be 8 characters long."],
    minlength: 2,
    maxlength: 120,
    //   validate: { validator: function(value) {
    //                 return /^(.?=.*[a-z])(?=.*[A-z])(.?=.*[$@$*!%&])[A-Za-z/d@$!%?&]{2,120}/.test(value);
    // },
  //   message: "Password must contain at least one of each: a number, uppercase letter and special character and must be 8 characters long."
  // }
},
}, { timestamps: true }
);
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

app.get('/', function (req, res) {
  if(session.user === undefined){
    res.render('login', {errors: session.errors});
  }
  else{
      res.render('index', {user: session.user});
  }
});

app.post('/register', function(req, res){
    session.errors = [];
    if(req.body.password != req.body.password_conf){
      session.errors.push('Password and confirmation must match');
    }
    var user = new User({
            email: req.body.email,
            password: req.body.password});
    user.save(function(err){
      if(err){
        for(var k in err.errors){
          if(err.errors.hasOwnProperty(k)){
              session.errors.push(err.errors[k]);
          }
        }
      }
      else{
        session.user = user;
      }
      res.redirect('/');
    });
  });

app.post('/login', function(req, res){
  User.findOne({email: req.body.email}, function(err, user){
    session.errors = [];
    if(user == null){
      session.errors.push('No account associated with that email address');
    }
    else {
      if(user.password == req.body.password){
        session.user = user;
      }
    else {
      session.errors.push('Password Incorrect');
    }
  }
  });
  res.redirect('/');
});

app.get('/logout', function (req, res) {
  session.user = undefined;
  res.redirect('/');
});

app.listen(8000, function () {
  console.log('listening to port 8000');
});
