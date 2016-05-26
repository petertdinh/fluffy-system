var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

var postSchema = mongoose.Schema({
    timeStamp: Date,
    mealPhoto:  String,
    mealName: String,
    mealNotes: String
});

exports.Post = mongoose.model('Post', postSchema);
