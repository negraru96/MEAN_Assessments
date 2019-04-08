var mongoose = require('mongoose');
var session = require('express-session');
var User = mongoose.model('User');

module.exports = {
  register: function(req, res){
    session.errors = [];
    if(req.body.password != req.body.password_conf){
      session.errors.push('Passwords do not match');
    }
    var user = new User({username: req.body.username,
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
  },

  login: function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
      session.errors = [];
      if(user == null){
        session.errors.push('No account associated with that email address');
      }
      else {
        if(user.password == req.body.password){
          session.user = user;
        }
      else{
        session.errors.push('Password Incorrect');
      }
      }
    });
    res.redirect('/');
}
};
