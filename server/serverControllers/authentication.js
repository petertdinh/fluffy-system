var jwt  = require('jwt-simple');
var User = require('../models/user');
var config = require('../config');
var CurrentUser = require('../models/currentUser');
var sendgrid = require('sendgrid')('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');
// var Q    = require('q');

function tokenForUser(user) {
  var timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

module.exports = {
  signup: function (req, res, next) {
    
    var username  = req.body.username;
    var password  = req.body.password;
    var email = req.body.email;
    
    //if either password or username are missing,
    //return error message
    if(!username || !password) {
      return res.status(422).send({ error: 'You must provide both a username and a password.' });
    }

    //See if a user with the given username exists
    
    User.findOne({username: username}, function(err, existingUser) {
      if(err){return next(err);}
      //If a user with username does exist, return an error
      if(existingUser) {
        return res.status(422).send({ error: 'Username is in use.' });
      }
       // If a user with username does NOT exist, create user record
       var user = new User({
            username: username,
            password: password
          });
       //save user record
       user.save(function(err) {
        //return an error on failed save
        if(err) { return next(err); }

        //set user as current user
        CurrentUser.saveLoggedInUser(req.user);

        // respond to request indicating the user was created 
        //create and return token
        res.json({ token: tokenForUser(user) });
       });
    })

    //sends email to user upon registration.

    sendgrid.send({
      to:       email,
      from:     'noreply@greenfield.com',
      subject:  'Thanks for subscribing!',
      text:     'Thanks for registering with our cooking app! May you discover your inner chef!'
    }, function(err, json) {
      if (err) { return console.error(err); }
      console.log(json, 'woohoo');
    });
  },

  signin: function (req, res, next) {
    //username and password have checked out
    //we are giving the user a token
    console.log(req.user);
    CurrentUser.saveLoggedInUser(req.user);
    res.send( { token: tokenForUser(req.user) });
  }
 
};