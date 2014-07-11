/**
 * Middleware configuration
 */
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var csrf = require('csurf');
var RedisStore = require('connect-redis')(session);

module.exports = {

  /**
   * Initialize middleware configuration
   * @param app Express app
   */
  init: function(app) {
    app.use(favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(session({
      store: new RedisStore(),
      secret: 'keyboard cat',
      saveUninitialized: true,
      resave: true
    }));
    app.use(csrf());
  }
};
