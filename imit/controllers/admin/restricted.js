/**
 * Admin restricted zone controllers
 */

module.exports = {

  index: function(req, res) {
    res.render('admin/dashboard', {});
  },

  logout: function(req, res) {
    req.session.authenticated = false;
    req.session.user = null;
    res.redirect('/admin/login');
  }
};