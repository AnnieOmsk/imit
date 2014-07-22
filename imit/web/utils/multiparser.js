/**
 * Multipart form parser
 * Assign fields to req.body, files to req.files
 */
var Formidable = require('formidable');
var settings = require('../../configuration/settings');

module.exports = function(req, res, next) {
  if (req.method === 'POST' && req.headers['content-type'].indexOf('multipart/form-data') >= 0) {
    var form = new Formidable.IncomingForm();
    form.uploadDir = settings.UPLOAD_DIR;
    form.parse(req, function(err, fields, files) {
      if (err)
        next(err);
      else {
        req.body = fields;
        if (files) {
          var keys = Object.keys(files);
          if (keys.length > 0) {
            for (var i=0; i<keys.length; i++) {
              req.body[keys[i]] = files[keys[i]];
            }
          }
        }
        next();
      }
    });
  } else {
    next();
  }
};