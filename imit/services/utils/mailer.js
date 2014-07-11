/**
 * Utility for sending emails
 */
var nodemailer = require("nodemailer");
var q = require('q');
var settings = require("../../configuration/settings");

var smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: settings.EMAIL_GMAIL_LOGIN,
    pass: settings.EMAIL_GMAIL_PASS
  }
});

// setup e-mail data with unicode symbols
var mailOptions = {
  from: settings.EMAIL_FROM
};

module.exports = {

  send: function(to, subject, text, html) {
    var deferred = q.defer();
    mailOptions.to = to;
    mailOptions.subject = subject;
    mailOptions.text = text;
    mailOptions.html = html;
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error) {
        console.log("Email sending error:" + error);
        deferred.reject(error);
      } else {
        console.log("Message sent: " + response.message);
        deferred.resolve(response);
      }
      // if you don't want to use this transport object anymore, uncomment following line
      //smtpTransport.close(); // shut down the connection pool, no more messages
    });
    return deferred.promise;
  }
};
