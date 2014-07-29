/**
 * Session utilities
 */

module.exports = {

//  userLogin: function(user, req) {
//    req.session.authenticated = true;
//    req.session.user = user;
//  },
//
//  userLogout: function(req) {
//    req.session.authenticated = false;
//    req.session.user = null;
//  },

  setMessage: function(message, req) {
    req.session.message = message;
  },

  readMessage: function(req) {
    var message = req.session.message;
    req.session.message = null;
    return message;
  }
};
