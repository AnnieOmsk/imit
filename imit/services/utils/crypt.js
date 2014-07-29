/**
 * Crypt utilities
 */
var bcrypt = require('bcrypt');
var q = require('q');
// Number of rounds to use for Bcrypt salt
var SALT_WORK_FACTOR = 10;

module.exports = {

  /**
   * Encodes password with Bcrypt
   * @param password  Plain text password
   * @returns promise, when resolved contains password Bcrypt hash
   */
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

  /**
   * Check if inputPassword is the same as encoded with Bcrypt cryptPassword
   * @param inputPassword   Plain text password
   * @param cryptPassword   Bcrypt password hash
   * @param cb  callback
   */
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
