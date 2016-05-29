var Authentication = require('./serverControllers/authentication');
var passportService = require('./services/passport');
var PostHelpers = require('./serverControllers/postHelpers');

var bodyParser = require('body-parser');
var recipes = require('./recipesAPI.js');
var multer = require('multer');
var fs = require('fs');
var posts = require("./models/post.js");
var moment = require('moment');
var sendgrid = require('sendgrid')('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');


// create application/json parser 
var jsonParser = bodyParser.json();

//create passport middleware objects
var requireAuth = passportService.authenticate('jwt',  { session: false });
var requireSignin = passportService.authenticate( 'local', { session: false});



var upload = multer({ dest: 'server/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
 
module.exports = function(app){

  app.get ('/', requireAuth, function(req, res) {
    
    res.send({success: true});
  } );

  app.post('/signup', jsonParser, Authentication.signup);

  app.post('/login', jsonParser, requireSignin, Authentication.signin);

  app.get('/add', function(req, res){
      res.status(200).send(recipes.meals);
  });


  app.get('/home', PostHelpers.listPosts);

  app.post('/upload', upload.fields([{name: 'image'}, {name: 'text'}, {name: 'title'}]), PostHelpers.uploadPosts);

  app.get('/uploads/*', function(req, res) {
    res.writeHead(200, {'Content-Type': 'image/png'});
      fs.readFile(__dirname + req.url, function(err, data) {
          if(err){ throw err; }
          res.end(data);
        });
    });
}



