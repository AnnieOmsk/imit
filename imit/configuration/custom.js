/**
 * Custom configuration
 */
module.exports = {

  /**
   * Initialize custom configuration
   * @param app Express app
   */
  init: function (app) {

    // Add empty often used objects to avoid undefined errors
    app.locals.errors = {};

    // Add csrf token to view
    app.use(function(req, res, next) {
      res.locals['_csrf'] = req.csrfToken();
      next();
    });
  }
};

