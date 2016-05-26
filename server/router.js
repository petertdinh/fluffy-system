

var recipes = require('./recipesAPI.js');
var multer = require('multer');
var fs = require('fs');

var upload = multer({ dest: 'server/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

module.exports = function(app){
app.get('/add', function(req, res){
    res.status(200).send(recipes.meals);
});

app.post('/upload', upload.single('image'), function(req, res) {
    console.log(req.file);
    res.send(req.file.filename);
});

}

