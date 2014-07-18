/**
 * Errors configuration
 */
var settings = require('./settings');

// Redirect forbidden errors in protected space
var protectedUri = '/admin/restricted';
var redirectUri = '/admin/login/';

module.exports = {

  /**
   * Initialize errors configuration
   * @param app Express app
   */
  init: function (app) {

    /// catch 404 under routes and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    /// error handlers

    // development error handler
    // will print stacktrace
    if (settings.ENV === 'dev') {
      app.use(function(err, req, res, next) {
        // redirect 403 in protected area
        if (res.statusCode === 403 && req.url.indexOf(protectedUri) === 0) {
          res.redirect(redirectUri);
        }
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });
  }
};

