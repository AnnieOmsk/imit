/**
 * Routes configuration
 */
var routes = require('../routes/index');
var admin = require('../routes/admin');

module.exports = {

  /**
   * Initialize routes
   * @param app Express app
   */
  init: function (app) {

    app.use('/', routes);
    app.use('/admin', admin);
  }
};

