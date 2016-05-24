
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('listening on port ' + port);
});

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'node_modules')));


app.post('/upload*', function(req, res) {
    console.log(req.method, req.url);
    var data = '';
    req.setEncoding('binary');
    req.on('data', function(chunk){
    	data += chunk;
    });
    
    req.on('end', function(){
    	fs.writeFile('picture.png', data, 'binary', function(err){
    		if(err) throw err;
    		console.log('file saved');
    	})
    })
});

app.get('/add', function(req, res){
    var json = [{title: 'burrito', recipe: 'microwave', ingredients: ['beans', 'rice', 'tortilla']}, {title: 'quiche', recipe: 'bake', ingredients: ['eggs', 'spinach']}];
    res.status(200).send(json);
})