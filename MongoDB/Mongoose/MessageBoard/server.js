var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb/localhost/basic_mongo', { useNewUrlParser: true });
var Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var MessageSchema = new mongoose.Schema({
  name: {type: String, required: true},
  message: {type: String, required: true},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, { timestamps: true });
mongoose.model('Message', MessageSchema);
var Message = mongoose.model('Message');

var CommentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  comment: {type: String, required: true},
  _message: {type: Schema.Types.ObjectId, ref: 'Message'},
}, { timestamps: true });
mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment');

app.post('/newMessage', function(req,res){
  var newMessage = new Message(req.body);
  new_message.save(function(err){
    if(err)
    res.json(err);
    else {
      res.redirect('/');
    }
  });
});

app.post('/newComment/:id', function(req,res){
  Message.findOne({_id:req.params.id}, function(err,message){
    if(err)
    res.json(err);
    else {
      var newComment = new Comment({
        _message: req.params.id,
        name: req.body.name,
        comment: req.body.comment,
      });
      console.log(newComment);
      newComment.save(function(err){
        if(err)
        res.json(err);
        else {
          res.redirect('/');
  }
});
}
});
});

app.get('/', function (req, res) {
  Message.find({}).populate('comments').exec(function(err, messages){
    if(err)
    res.json(err);
    else {
      console.log(messages);
      res.render('index', {messages: messages});
    }
  });
});

app.listen(8000, function () {
  console.log('listening to port 8000');
});
