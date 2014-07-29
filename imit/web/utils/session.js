/**
 * Session utilities
 */

module.exports = {

  setMessage: function(message, req) {
    req.session.message = message;
  },

  readMessage: function(req) {
    var message = req.session.message;
    req.session.message = null;
    return message;
  }
};
