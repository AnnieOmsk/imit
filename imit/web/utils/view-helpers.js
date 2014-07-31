/**
 * View helpers
 */
var message = require('../../services/utils/message');

module.exports = {
  // Add default objects to prevent undefined exception throwing
  errors: {},
  flashMessage: {},

  // Cut string to certain length if it's longer
  strip: function(str, len) {
    if (typeof(str) !== 'string') {
      return "";
    }
    var limit = len - 3;
    if (str.length > limit) {
      return str.substr(0, limit) + "...";
    } else {
      return str;
    }
  },

  // Escapes html symbols
  escape: function(s) {
    return s.replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },

  // Print localised message
  msg: function(key, locale, data) {
    return message.msg(key, locale, data);
  }
};