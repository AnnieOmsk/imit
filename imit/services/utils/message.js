var fs = require('fs');
var chalk = require('chalk');
var util = require('util');
// Object to store all messages
var messages = {};
// Object to store available languages
var langs = [];
// Object to store default language
var defaultLang;

/**
 * Recurse scan directory
 * @param dir   Directory
 * @param done  Callback
 */
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

/**
 * Get nested data from object by string
 * @param obj      Object
 * @param str      String
 * @returns {*}    Data
 */
var byString = function(obj, str) {
  str = str.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  str = str.replace(/^\./, '');           // strip a leading dot
  var a = str.split('.');
  while (a.length) {
    var n = a.shift();
    if (n in obj) {
      obj = obj[n];
    } else {
      return;
    }
  }
  return obj;
};

module.exports = {
  /**
   * Initialize localisation with following parameters
   * @param dir                 Directory
   * @param languages           Available languages
   * @param defaultLanguage     Default language
   */
  init: function(dir, languages, defaultLanguage) {
    langs = languages;
    defaultLang = defaultLanguage;
    var fileRegex = new RegExp("([^\/\]*?)\\.([a-z]{2})\\.[^\\.]*$");
    walk(dir, function(err, results) {
      if (err) throw err;
      results = results.filter(function(item) {
        var fileMatch = fileRegex.exec(item);
        return (fileMatch != null)
      });
      for (var i=0; i<results.length; i++) {
        var fileMatch = fileRegex.exec(results[i]);
        if (fileMatch) {
          console.log("Loading localised messages from file " + chalk.cyan(results[i]));
          if (!messages[fileMatch[2]]) {
            messages[fileMatch[2]] = {};
          }
          try {
            messages[fileMatch[2]][fileMatch[1]] = require(results[i]);
          } catch(e) {
            console.warn(chalk.red("WARN!") + "Failed loading file " + chalk.cyan(results[i]) + ". Skipped.");
          }
        }
      }
    });
  },

  /**
   * Retrieve message by key
   * @param key         Key
   * @param language    Language
   * @param data        Optional data to use int string
   * @returns Localised message
   */
  msg: function(key, language, data) {
    var message;
    if (langs.indexOf(language) !== -1) {
      message = byString(messages, language + "." + key) || key;
    } else {
      message = byString(messages, defaultLang + "." + key) || key;
    }
    if (message !== key && data !== undefined && data !== null) {
      message = util.format(message, data);
    }

    return message;
  }
};