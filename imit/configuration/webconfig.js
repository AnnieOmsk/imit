/**
 * Web configuration
 * Initializing all middleware, static files and views
 */
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var static = require('express').static;
var csrf = require('csurf');
var RedisStore = require('connect-redis')(session);
var settings = require('./settings');

module.exports = {

  /**
   * Setting up all middleware, static files and views
   * @param app Express app
   */
  init: function(app) {
    app.use(favicon());
    app.use(logger(settings.ENV));
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

    // Setting up static resources directory
    app.use(static(path.join(__dirname, '..', 'public')));

    // Setting up template engine
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'jade');

    // Add empty often used objects to avoid undefined errors
    app.locals.errors = {};

    // Add csrf token to view
    app.use(function(req, res, next) {
      res.locals['_csrf'] = req.csrfToken();
      next();
    });
  }
};
