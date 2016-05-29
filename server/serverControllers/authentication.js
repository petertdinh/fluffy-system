var jwt  = require('jwt-simple');
var User = require('../models/user');
var config = require('../config');
// var Q    = require('q');

function tokenForUser(user) {
  var timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

module.exports = {
  signup: function (req, res, next) {
    
    var username  = req.body.username;
    var password  = req.body.password;
    
    //if either password or username are missing,
    //return error message
    if(!username || !password) {
      return res.status(422).send({ error: 'You must provide both a username and a password.' });
    }

    //See if a user with the given email exists
    
    User.findOne({username: username}, function(err, existingUser) {
      if(err){return next(err);}
      //If a user with email does exist, return an error
      if(existingUser) {
        return res.status(422).send({ error: 'Email is in use.' });
      }
       // If a user with email does NOT exist, create user record
       var user = new User({
            username: username,
            password: password
          });
       //save user record
       user.save(function(err) {
        //return an error on failed save
        if(err) { return next(err); }

        // respond to request indicating the user was created 
        //create and return token
        res.json({ token: tokenForUser(user) });
       });
    })
  },

  signin: function (req, res, next) {
    //username and password have checked out
    //we are giving the user a token
    res.send( { token: tokenForUser(req.user) });
  }
 
};