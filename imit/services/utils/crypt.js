/**
 * Crypt utilities
 */
var bcrypt = require('bcrypt');
var q = require('q');
var SALT_WORK_FACTOR = 10;

module.exports = {
  encode: function(password) {
    var deferred = q.defer();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if(err) {
        deferred.reject(err);
      }
      bcrypt.hash(password, salt, function(err, hash) {
        if(err) {
          deferred.reject(err);
        }
        deferred.resolve(hash);
      });
    });
    return deferred.promise;
  },

  comparePasswords: function(inputPassword, cryptPassword, cb) {
    bcrypt.compare(inputPassword, cryptPassword, function(err, isMatch) {
      if(err) {
        cb(err);
      } else{
        cb(null, isMatch);
      }
    });
  }
};
