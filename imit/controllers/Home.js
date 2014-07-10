/**
 * Home controllers
 */

module.exports = {

  home: function (req, res) {
    res.redirect('/index.html');
  },

  index: function (req, res) {
    res.render('home/index', { title: 'IMIT Index' });
  },

  contacts: function (req, res) {
    res.render('home/contacts', { title: 'IMIT Contacts' });
  },

  goToUniversity: function (req, res) {
    res.render('home/go_to_university', { title: 'IMIT Go to university' });
  },

  graduates: function (req, res) {
    res.render('home/graduates', { title: 'IMIT Graduates' });
  },

  interesting: function (req, res) {
    res.render('home/interesting', { title: 'IMIT Interesting' });
  }
};
