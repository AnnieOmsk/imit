/**
 * Mapping utilities
 */

/**
 * Converts object to object with camel-cased field names instead
 * of underscored spaces: first_name -> firstName
 * @param obj  Object
 */
var objectConverter = function(obj) {
  var keys = Object.keys(obj);
  if (keys.length > 0) {
    var result = {};
    for (var i=0; i<keys.length; i++) {
      var currentKey = keys[i];
      var objProperty = currentKey.replace(/_[0-9a-zA-Z]/g, function(x) {return x[1].toUpperCase();});
      result[objProperty] = obj[currentKey];
    }
    return result;
  }
  return null;
};

module.exports = {

  /**
   * Takes SQL row as argument and converts it to object
   * where keys changed to camel-cased: first_name -> firstName
   */
  rowConvert: function(row) {
    if (row == null) {
      return null;
    }
    return objectConverter(row);
  },

  /**
   * Synchronously converts array of rows to array of object
   * with javascript camel-cased field names
   * @param rows
   */
  rowsConvert: function(rows) {
    if (rows == null) {
      return null;
    }
    var result = [];
    for (var i=0; i<rows.length; i++) {
      var currentRow = rows[i];
      result.push(objectConverter(currentRow));
    }
    return result;
  }
};
