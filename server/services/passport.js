var passport = require('passport');
var User = require('../models/user');
var config = require('../config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

//export passport object
module.exports = passport;

// setup options for JwtStrategy
var jwtOptions = {
	//JWT will be found in request header under "authorization"
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	//secret will be found in config.js file
	secretOrKey: config.secret
};

//Create JWT Strategy
	//"payload" is the decoded JWT (sub, iat)
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	//console.log("Inside jwtLogin");
	//Check if user ID exists in database
	//If yes, call done with user object
	//If no, call done without user object
	User.findById(payload.sub, function(err, user) {
		//failed search, false = user not found
		if(err) {return done(err, false);}
		//successful search
		if(user) {
			//user found
			done(null, user);
		} else {
			//user not found
			done(null, false);
		}
	});

});

//Tell passport to use strategy
passport.use(jwtLogin);