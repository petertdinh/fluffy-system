//var jwt  = require('jwt-simple');
var User = require('../models/user.js');
var Q    = require('q');

module.exports = {
  signup: function (req, res, next) {
    
    var username  = req.body.username;
    var password  = req.body.password;

    
    res.send({success:true});

    //See if a user with the given email exists

    //If a user with email does exist, return an error

    // If a user with email does NOT exist, create and save user record

    // respond to request indicating the user was created




    // var create;
    // var newUser;

    // var findOne = Q.nbind(User.findOne, User);

    // // check to see if user already exists
    // findOne({username: username})
    //   .then(function(user) {
    //     if (user) {
    //       next(new Error('User already exist!'));
    //     } else {
    //       // make a new user if not one
    //       create = Q.nbind(User.create, User);
    //       newUser = {
    //         username: username,
    //         password: password
    //       };
    //       return create(newUser);
    //     }
    //   })
    //   .then(function (user) {
    //     // create token to send back for auth
    //     var token = jwt.encode(user, 'secret');
    //     res.json({token: token});
    //   })
    //   .fail(function (error) {
    //     next(error);
    //   });
  },
  login: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    //return error message if username & password are not submitted

    if(!username || !password){
      return res.status(422).send({error: 'Please provide username and password.' });
    }

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function(foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.status(200).send();
          } else {
            res.status(401).send();
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};