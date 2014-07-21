/**
 * Main service
 */

var q = require('q');
var db = require('../configuration/database').pool;
var mapper = require('./utils/mapper');
var Graduate = require('../models/graduate');

var SQL_FIND_GRADUATES = "SELECT * FROM graduate";

module.exports = {

  findGraduates: function(limit, randomOrder) {
    var deferred = q.defer();
    var query = SQL_FIND_GRADUATES;
    if (randomOrder) {
      query += " ORDER BY RAND()";
    } else {
      query += " ORDER BY id";
    }
    if (limit) {
      query += " LIMIT " + limit;
    }
    db.query(query, [], function(err, res) {
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
  }
};