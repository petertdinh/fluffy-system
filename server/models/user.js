var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
var SALT_WORK_FACTOR  = 10;

// var Q        = require('q');


//define model
var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },
  //salt: String
});

//run function before saving user model
userSchema.pre('save', function (next) {
  //access the user model
  var user = this;

  // only hash the password if it has been modified (or is new)
  // if (!user.isModified('password')) {
  //   return next();
  // }

  // generate a salt and run callback
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) { return next(err); }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // override the cleartext password with the hashed one
      user.password = hash;
      //user.salt = salt;
      //save the model
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err) { return callback(err); }

    callback(null, isMatch);
  })
}
// userSchema.methods.comparePasswords = function (candidatePassword) {
//   var defer = Q.defer();
//   var savedPassword = this.password;
//   bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
//     if (err) {
//       defer.reject(err);
//     } else {
//       defer.resolve(isMatch);
//     }
//   });
//   return defer.promise;
// };



// create model class
var ModelClass = mongoose.model('user', userSchema);

//export model
module.exports = ModelClass;