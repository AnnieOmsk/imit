/**
 * Notify service
 */
var settings = require('../../configuration/settings');
var mailer = require('./mailer');
var message = require('./message');

var notifyByEmail = function(templateName, params, to, subject) {
  var htmlEmail = mailer.buildEmail(templateName, params);
  htmlEmail.then(function(data) {
    mailer.send(to, subject, "", data);
  }, function(err) {
    console.log("Building html email failed:" + err);
  });
};

module.exports = {
  /**
   * Process notification
   * @param obj     Parameters object
   * @param action  Action related to notification
   * @param locale  Locale to use for email
   */
  process: function(obj, action, locale) {
    var templateName;
    var params;
    var subject;
    var to;
    switch (action) {
      /** Notification sent to moderator for reviewing request */
      case 'review-request':
        templateName = 'review-request';
        params = {
          email: obj.email,
          firstName: obj.firstName,
          lastName: obj.lastName,
          applyLink: settings.SITE_ADDRESS + "/admin/register-apply?code=" + obj.secretCode,
          declineLink: settings.SITE_ADDRESS + "/admin/register-decline?code=" + obj.secretCode
        };
        subject = message.msg('subjects.request.review', locale);
        to = settings.EMAIL_GMAIL_LOGIN;
        break;
      /** Notification sent to user requesting administration rights if request was applied */
      case 'request-applied':
        templateName = 'request-applied';
        params = obj;
        params.adminLink = settings.SITE_ADDRESS + "/admin/";
        subject = message.msg('subjects.request.applied', locale);
        to = params.email;
        break;
      /** Notification sent to user requesting administration rights if request was declined */
      case 'request-declined':
        templateName = 'request-declined';
        params = obj;
        params.adminLink = settings.SITE_ADDRESS + "/admin/";
        subject = message.msg('subjects.request.declined', locale);
        to = params.email;
        break;
    /** Send instructions, how to restore password to user */
      case 'password-restore':
        templateName = 'password-restore';
        params = obj;
        params.restoreLink = settings.SITE_ADDRESS + "/admin/new-password?code=" + params.code;
        subject = message.msg('subjects.password.restore', locale);
        to = params.email;
        break;
    /** Notification sent to user when his password was changed */
      case 'password-changed':
        templateName = 'password-changed';
        params = obj;
        subject = message.msg('subjects.password.changed', locale);
        to = params.email;
        break;
      default:
        return null;
    }

    notifyByEmail(templateName, params, to, subject);
  }
};
