/**
 * Routes configuration
 */
var routes = require('../routes/index');
var admin = require('../routes/admin');
var restricted = require('../routes/restricted');

module.exports = {

  /**
   * Initialize routes
   * @param app Express app
   */
  init: function (app) {

    app.use('/', routes);
    app.use('/admin/restricted', restricted);
    app.use('/admin', admin);
  }
};

