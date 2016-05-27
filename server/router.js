
var recipes = require('./recipesAPI.js');
var multer = require('multer');
var fs = require('fs');
var posts = require("./models/post.js");
var moment = require('moment')

var upload = multer({ dest: 'uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

module.exports = function(app){

app.get('/add', function(req, res){
    res.status(200).send(recipes.meals);
});


app.get('/home', function(req, res){
  posts.Post.find(function (err, posts) {
   if (err) return console.error(err);
    var posts = posts.map(function(post){
      var time = moment(post.timeStamp).fromNow();
      var copy = { 
        timeStamp: post.timeStamp,
        displayTime: time,
        mealPhoto: post.mealPhoto,
        mealName: post.mealName,
        mealNotes: post.mealNotes
      };
      return copy;
    });
    res.status(200).send(posts);
  });
});

app.post('/upload', upload.fields([{name: 'image'}, {name: 'text'}, {name: 'title'}]), function(req, res) {
    //console.log(req);
    res.redirect('/#/home');
    var user1 = new posts.Post({ timeStamp: Date.now(),
      mealPhoto:  req.files['image'][0].filename,
      mealName: req.body.title,
      mealNotes:  req.body.text
    });
    user1.save(function (err, callback) {
      if (err) return console.error(err);
      console.log("saved!", user1);
    });

});

app.get('/uploads/*', function(req, res) {
    res.writeHead(200, {'Content-Type': 'image/png'});
    fs.readFile(__dirname + req.url, function(err, data) {
        if(err) throw err;
        res.end(data);
    });
});
}



