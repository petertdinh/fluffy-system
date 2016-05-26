
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

app.post('/upload', upload.fields([{name: 'image'}, {name: 'text'}, {name: 'title'}]), function(req, res) {
    console.log(req);
    res.redirect('/');
});

app.get('/uploads/*', function(req, res) {
    res.writeHead(200, {'Content-Type': 'image/png'});
    fs.readFile(__dirname+ req.url, function(err, data) {
        if(err) throw err;
        res.end(data);
    });
});
}

