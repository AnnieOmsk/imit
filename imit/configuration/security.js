/**
 * Security configuration
 */

function userIsAllowed(req) {
  if (req.session.authenticated != null && req.session.authenticated == true) {
    return true;
  } else {
    return false;
  }
};

module.exports = {

  /**
   * Initialize security
   * @param app Express app
   */
  init: function (app) {

    app.all('/admin/restricted*', function(req, res, next) {
      if(userIsAllowed (req)){
          next();
        } else {
          res.redirect("/admin/login");
        }
      });
  }
};

