/**
 * Errors configuration
 */
var settings = require('./settings');

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

