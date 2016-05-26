var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//model
var commentSchema = new Schema({
	timeStamp: {type: Date, default: Date.now},
	comment: String
});

var postSchema = new Schema({
	timeStamp: {type: Date, default: Date.now},
	recipe: String,
	picture: Schema.Types.Mixed,
	comments: [commentSchema]

});

//model class
var PostClass = mongoose.model('post', postSchema);
PostClass.insertOne({recipe:'bull'});
//export model
module.exports = PostClass;