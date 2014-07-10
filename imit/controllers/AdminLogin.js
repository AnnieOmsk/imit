/**
 * Admin Login controllers
 */
module.exports = {

  home: function(req, res) {
    res.redirect('/admin/login');
  },

  get: function(req, res) {
    res.render('admin/login', {});
  },

  post: function(req, res) {
    var errors = {};
    errors.password = "Incorrect password";
    res.render('admin/login', {
      errors: errors
    });
  }
};