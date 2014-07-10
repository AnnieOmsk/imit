/**
 * Admin registration controllers
 */
module.exports = {

  get: function(req, res) {
    res.render('admin/register', {});
  },

  post: function(req, res) {
    var form = req.params;
    var errors = {};
    errors.password = "Incorrect password";
    res.render('admin/register', {
      errors: errors
    });
  }
};