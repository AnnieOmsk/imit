/**
 * Graduates service
 * All methods related to Graduate Entity
 */
var q = require('q');
var fs = require('fs');
var db = require('../configuration/database').pool;
var mapper = require('./utils/mapper');
var notify = require('./utils/notify');
var settings = require("../configuration/settings");
var Graduate = require('../models').Graduate;

var SQL_FIND_GRADUATES = "SELECT * FROM graduate ORDER BY id DESC";
var SQL_SAVE_GRADUATE = "INSERT INTO graduate (full_name, img, occupancy, department, graduated_in, lead, full_lead, text) " +
  "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
var SQL_UPDATE_GRADUATE = "UPDATE graduate SET full_name=?, img=?, occupancy=?, department=?, graduated_in=?, lead=?, " +
  "full_lead=?, text=? WHERE id=?";
var SQL_FIND_GRADUATE = "SELECT * FROM graduate WHERE id = ?";
var SQL_DELETE_GRADUATE = "DELETE FROM graduate WHERE id = ?";

module.exports = {

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
    if (graduate.id != null) {
      // Updating existing graduate
      data.push(graduate.id);
      db.query(SQL_UPDATE_GRADUATE, data, function(err, res) {
        if (err) {
          console.log("Updating graduate error:" + err);
          deferred.reject(err);
        } else {
          deferred.resolve(res);
        }
      });
    } else {
      // Creating new
      db.query(SQL_SAVE_GRADUATE, data, function(err, res) {
        if (err) {
          console.log("Saving graduate error:" + err);
          deferred.reject(err);
        } else {
          deferred.resolve(res);
        }
      });
    }
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
  },

  findGraduate : function(id) {
    var deferred = q.defer();
    db.query(SQL_FIND_GRADUATE, [id], function(err, res) {
      if (err) {
        console.log("Find graduate service error:" + err);
        deferred.reject(err);
      } else {
        var found = null;
        if (res.rows[0] != null) {
          var graduate = new Graduate();
          found = graduate.load(mapper.rowConvert(res.rows[0]));
        }
        if (found == null) {
          deferred.reject(new Error('NOT_FOUND'));
        }
        deferred.resolve(found);
      }
    });
    return deferred.promise;
  },

  deleteGraduate : function(id) {
    var deferred = q.defer();
    db.query(SQL_DELETE_GRADUATE, [id], function(err, res) {
      if (err) {
        console.log("Delete graduate service error:" + err);
        deferred.reject(err);
      } else {
        if (res.affectedRows !== 1) {
          deferred.reject(new Error('WRONG_CODE'));
        }
        deferred.resolve(res);
      }
    });
    return deferred.promise;
  }
};