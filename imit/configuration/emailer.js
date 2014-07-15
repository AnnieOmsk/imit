/**
 * Email sending configuration
 */
var nodemailer = require("nodemailer");
var settings = require('./settings');

// Setting up SMTP options
var smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: settings.EMAIL_GMAIL_LOGIN,
    pass: settings.EMAIL_GMAIL_PASS
  }
});

module.exports = smtpTransport;