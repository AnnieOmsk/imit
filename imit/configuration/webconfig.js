/**
 * Web configuration
 * Initializing all middleware, static files and views
 */
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var staticExpress = require('express').static;
var csrf = require('csurf');
var RedisStore = require('connect-redis')(session);
var settings = require('./settings');
var viewHelpers = require('../web/utils/view-helpers');
var multiParser = require('../web/utils/multiparser');
var message = require('../services/utils/message');
var localeResolver = require('../web/utils/locale-resolver');
message.init(__dirname + '/../messages', ['ru', 'en'], 'ru');

module.exports = {

  /**
   * Setting up all middleware, static files and views
   * @param app Express app
   */
  init: function(app) {
    app.use(logger(settings.ENV));
    // Parsing multipart forms
    app.use(multiParser);
    app.use(bodyParser());
    app.use(cookieParser());
    app.use(session({
      store: new RedisStore(),
      secret: 'keyboard cat slap slap',
      saveUninitialized: true,
      // This value is stored server-side only so used both for cookie and db session store
      cookie: {
        maxAge: settings.SESSION_TIME_IN_MS,
        httpOnly: true
      },
      resave: true
    }));

    // Refresh session expiration on every request
    app.use(function(req, res, next) {
      req.session.cookie.maxAge = settings.SESSION_TIME_IN_MS;
      // needed to make the session `dirty` so the session middleware re-sets the cookie
      req.session.random = Math.random();
      next();
    });

    app.use(csrf());
    app.use(localeResolver);

    // Setting up static resources directory
    app.use(staticExpress(path.join(__dirname, '..', 'public')));

    // Setting up template engine
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'jade');

    // Adding view helpers
    app.locals = viewHelpers;

    // Add csrf token to view
    app.use(function(req, res, next) {
      res.locals['_csrf'] = req.csrfToken();
      next();
    });
  }
};
