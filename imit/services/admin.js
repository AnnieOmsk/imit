/**
 * Admin service
 */

var q = require('q');
var crypto = require('crypto');
var db = require('./utils/db');
var begin = require('./utils/transactions');
var mailer = require('./utils/mailer');
var settings = require('../configuration/settings');

var SQL_SAVE_ADMIN_REQUEST = "INSERT INTO request (email, password, first_name, last_name, secret_code) " +
  "VALUES (?, ?, ?, ?, ?)";
var SQL_APPLY_REQUEST = "UPDATE request SET accepted = TRUE WHERE secret_code = ? AND accepted IS NULL";
var SQL_DECLINE_REQUEST = "UPDATE request SET accepted = FALSE WHERE secret_code = ? AND accepted IS NULL";
var SQL_CREATE_ADMIN = "INSERT INTO admin (email, password, first_name, last_name, secret_code) " +
  "SELECT email, password, first_name, last_name, secret_code FROM request WHERE secret_code = ? AND accepted = TRUE";

module.exports = {

  saveRequest: function(request) {
    var deferred = q.defer();
    request.secretCode = crypto.randomBytes(20).toString('hex');
    var data = [request.email, request.password, request.firstName, request.lastName, request.secretCode];
    db.query(SQL_SAVE_ADMIN_REQUEST, data, function(err, res) {
      if (err) {
        console.log("Saving request error:" + err);
        deferred.reject(err);
      } else {
        mailer.send(
          settings.EMAIL_GMAIL_LOGIN,
          "Новый запрос на администрирование сайта imit-omsu.ru",
            "Вам пришёл новый запрос на админинстрирование сайта от "
            + request.email + " " + request.lastName + " " + request.firstName + "\n" +
              "Принять заявку: http://localhost:3000/admin/register-apply?code=" + request.secretCode + "\n" +
              "Отклонить заявку: http://localhost:3000/admin/register-decline?code=" + request.secretCode + "\n"
        );
        deferred.resolve(res);
      }
    });
    return deferred.promise;
  },

  applyRequest: function(code) {
    var deferred = q.defer();
    var tx = begin(db);
    var data = [];
    tx.on('error', function(err) {
      console.log("Apply request unhandled query error");
      tx.rollback();
      deferred.reject(err);
    });
    db.query(SQL_APPLY_REQUEST, [code], function(err, res) {
      if (err) {
        console.log("Applying request error:" + err);
        deferred.reject(err);
      } else {
        data.push(res);
        db.query(SQL_CREATE_ADMIN, [code], function(err, res) {
          if (err) {
            console.log("Creating admin error:" + err);
            deferred.reject(err);
          } else {
            data.push(res);
            tx.commit(function(err){
              if (err) {
                console.log("Error occurs during creating admin:" + err);
                deferred.reject(err);
              } else {
                deferred.resolve(data);
              }
            });
          }
        });
      }
    });
    return deferred.promise;
  },

  declineRequest: function(code) {
    var deferred = q.defer();
    db.query(SQL_DECLINE_REQUEST, [code], function(err, res) {
      if (err) {
        console.log("Declining request error:" + err);
        deferred.reject(err);
      } else {
        deferred.resolve(res);
      }
    });
    return deferred.promise;
  }
};