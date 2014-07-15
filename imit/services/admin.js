/**
 * Admin service
 */

var q = require('q');
var crypto = require('crypto');
var db = require('../configuration/database').pool;
var begin = require('../configuration/database').begin;
var mapper = require('./utils/mapper');
var notify = require('./utils/notify');
var Request = require('../models/request');

var SQL_SAVE_ADMIN_REQUEST = "INSERT INTO request (email, password, first_name, last_name, secret_code) " +
  "VALUES (?, ?, ?, ?, ?)";
var SQL_APPLY_REQUEST = "UPDATE request SET accepted = TRUE WHERE secret_code = ? AND accepted IS NULL";
var SQL_DECLINE_REQUEST = "UPDATE request SET accepted = FALSE WHERE secret_code = ? AND accepted IS NULL";
var SQL_CREATE_ADMIN = "INSERT INTO admin (email, password, first_name, last_name, secret_code) " +
  "SELECT email, password, first_name, last_name, secret_code FROM request WHERE secret_code = ? AND accepted = TRUE";
var SQL_SELECT_REQUEST = "SELECT * FROM request WHERE secret_code = ?";
var SQL_LOGIN_CHECK = "SELECT * FROM admin where email = ? AND password = ?";

var findRequest = function(code) {
  var deferred = q.defer();
  db.query(SQL_SELECT_REQUEST, [code], function(err, res) {
    if (err) {
      console.log("Saving request error:" + err);
      deferred.reject(err);
    } else {
      var adminRequest = new Request();
      adminRequest.load(mapper.rowConvert(res.rows[0]));
      adminRequest.password = "";
      deferred.resolve(adminRequest);
    }
  });
  return deferred.promise;
};

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
        notify.process(request, 'review-request');
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
        tx.rollback();
      } else {
        data.push(res);
        db.query(SQL_CREATE_ADMIN, [code], function(err, res) {
          if (err) {
            console.log("Creating admin error:" + err);
            tx.rollback();
            deferred.reject(err);
          } else {
            data.push(res);
            tx.commit(function(err){
              if (err) {
                console.log("Error occurs during creating admin:" + err);
                tx.rollback();
                deferred.reject(err);
              } else {
                var promise = findRequest(code);
                promise.then(function(data) {
                  notify.process(data, 'request-applied');
                }, function(err) {
                  console.log("Cannot retrieve request data from db");
                });
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
        var promise = findRequest(code);
        promise.then(function(data) {
          notify.process(data, 'request-declined');
        }, function(err) {
          console.log("Cannot retrieve request data from db");
        });
        deferred.resolve(res);
      }
    });
    return deferred.promise;
  },

  loginCheck : function(email, password) {
    var deferred = q.defer();
    db.query(SQL_LOGIN_CHECK, [email, password], function(err, res) {
      if (err) {
        console.log("Login check request error:" + err);
        deferred.reject(err);
      } else {
        var found = null;
        if (res.rows[0] != null) {
          var adminRequest = new Request();
          found = adminRequest.load(mapper.rowConvert(res.rows[0]));
          found.password = null;
        }
        deferred.resolve(found);
      }
    });
    return deferred.promise;
  }
};