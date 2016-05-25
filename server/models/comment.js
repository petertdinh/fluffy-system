var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//model
var commentSchema = new Schema({
	timeStamp: {type: Date, default: Date.now},
	comment: String
});