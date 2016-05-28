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
    });

  // login: function (req, res, next) {
  //   var username = req.body.username;
  //   var password = req.body.password;

  //   //return error message if username & password are not submitted

  //   if(!username || !password){
  //     return res.status(422).send({error: 'Please provide username and password.' });
  //   }

  //   var findUser = Q.nbind(User.findOne, User);
  //   findUser({username: username})
  //     .then(function (user) {
  //       if (!user) {
  //         next(new Error('User does not exist'));
  //       } else {
  //         return user.comparePasswords(password)
  //           .then(function(foundUser) {
  //             if (foundUser) {
  //               var token = jwt.encode(user, 'secret');
  //               res.json({token: token});
  //             } else {
  //               return next(new Error('No user'));
  //             }
  //           });
  //       }
  //     })
  //     .fail(function (error) {
  //       next(error);
  //     });
  // },

  

  // checkAuth: function (req, res, next) {
  //   // checking to see if the user is authenticated
  //   // grab the token in the header is any
  //   // then decode the token, which we end up being the user object
  //   // check to see if that user exists in the database
  //   var token = req.headers['x-access-token'];
  //   if (!token) {
  //     next(new Error('No token'));
  //   } else {
  //     var user = jwt.decode(token, 'secret');
  //     var findUser = Q.nbind(User.findOne, User);
  //     findUser({username: user.username})
  //       .then(function (foundUser) {
  //         if (foundUser) {
  //           res.status(200).send();
  //         } else {
  //           res.status(401).send();
  //         }
  //       })
  //       .fail(function (error) {
  //         next(error);
  //       });
  //   }
  // }
}
};