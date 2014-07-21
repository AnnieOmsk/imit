/**
 * Admin service
 */

var q = require('q');
var crypto = require('crypto');
var fs = require('fs');
var db = require('../configuration/database').pool;
var begin = require('../configuration/database').begin;
var mapper = require('./utils/mapper');
var notify = require('./utils/notify');
var settings = require("../configuration/settings");
var Request = require('../models/request');
var Admin = require('../models/admin');
var Graduate = require('../models/graduate');

var SQL_SAVE_ADMIN_REQUEST = "INSERT INTO request (email, password, first_name, last_name, secret_code) " +
  "VALUES (?, ?, ?, ?, ?)";
var SQL_APPLY_REQUEST = "UPDATE request SET accepted = TRUE WHERE secret_code = ? AND accepted IS NULL";
var SQL_DECLINE_REQUEST = "UPDATE request SET accepted = FALSE WHERE secret_code = ? AND accepted IS NULL";
var SQL_CREATE_ADMIN = "INSERT INTO admin (email, password, first_name, last_name, secret_code) " +
  "SELECT email, password, first_name, last_name, secret_code FROM request WHERE secret_code = ? AND accepted = TRUE";
var SQL_SELECT_REQUEST = "SELECT * FROM request WHERE secret_code = ?";
var SQL_FIND_ADMIN = "SELECT * FROM admin where email = ? AND password = ?";
var SQL_FIND_GRADUATES = "SELECT * FROM graduate ORDER BY id DESC";
var SQL_SAVE_GRADUATE = "INSERT INTO graduate (full_name, img, occupancy, department, graduated_in, lead, full_lead, text) " +
  "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

var findRequest = function(code) {
  var deferred = q.defer();
  db.query(SQL_SELECT_REQUEST, [code], function(err, res) {
    if (err) {
      console.log("Saving request error:" + err);
      deferred.reject(err);
    } else {
      var result = res.rows[0];
      if (result != null) {
        var adminRequest = new Request();
        adminRequest.load(mapper.rowConvert(result));
        adminRequest.password = "";
        deferred.resolve(adminRequest);
      } else {
        deferred.resolve(null);
      }
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
        if (res.affectedRows !== 1) {
          deferred.reject(new Error('WRONG_CODE'));
        }
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
        if (res.affectedRows !== 1) {
          deferred.reject(new Error('WRONG_CODE'));
        }
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

  findAdmin : function(email, password) {
    var deferred = q.defer();
    db.query(SQL_FIND_ADMIN, [email, password], function(err, res) {
      if (err) {
        console.log("Login check request error:" + err);
        deferred.reject(err);
      } else {
        var found = null;
        if (res.rows[0] != null) {
          var admin = new Admin();
          found = admin.load(mapper.rowConvert(res.rows[0]));
        }
        deferred.resolve(found);
      }
    });
    return deferred.promise;
  },

  findGraduates: function() {
    var deferred = q.defer();
    db.query(SQL_FIND_GRADUATES, [], function(err, res) {
      if (err) {
        console.log("Finding graduates error:" + err);
        deferred.reject(err);
      } else {
        var found = [];
        var objects = mapper.rowsConvert(res.rows);
        for (var i=0; i<objects.length; i++) {
          var graduate = new Graduate();
          found.push(graduate.load(objects[i]));
        }
        deferred.resolve(found);
      }
    });
    return deferred.promise;
  },

  saveGraduate: function(graduate) {
    var deferred = q.defer();
    var data = [graduate.fullName, graduate.img, graduate.occupancy, graduate.department, graduate.graduatedIn,
      graduate.lead, graduate.fullLead, graduate.text];
    db.query(SQL_SAVE_GRADUATE, data, function(err, res) {
      if (err) {
        console.log("Saving graduate error:" + err);
        deferred.reject(err);
      } else {
        deferred.resolve(res);
      }
    });
    return deferred.promise;
  },

  imageStore: function(image) {
    console.log('Storing image');
    var tmpFile = image.path;
    var uniqueDir = tmpFile.substr(tmpFile.lastIndexOf('/'));
    var storedFolder = settings.IMAGE_DIR + uniqueDir;
    var storedFile = storedFolder + "/" + image.name;

    fs.mkdirSync(storedFolder);
    var source = fs.createReadStream(tmpFile);
    var dest = fs.createWriteStream(storedFile);

    source.pipe(dest);
    source.on('end', function() {
      fs.unlinkSync(tmpFile);
    });
    source.on('error', function(err) {
      console.log('Error occurs while moving image from tmp:' + tmpFile + '\n to image folder path:' + storedFile +
        '\nError:' + err);
    });

    var imageUri = settings.IMAGE_DIR_URI + uniqueDir + "/" + image.name;
    return imageUri;
  }
};