/**
 * Routes configuration
 */
var routes = require('../web/routes/index');
var admin = require('../web/routes/admin');
var restricted = require('../web/routes/restricted');

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

