var recipes = require('./recipesAPI.js');

module.exports = function(app){
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
    res.status(200).send(recipes.meals);
});

}