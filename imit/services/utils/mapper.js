/**
 * Mapping utilities
 */
module.exports = {

  /**
   * Takes SQL row as argument and converts it to object
   * where keys changed to camel-cased: first_name -> firstName
   */
  rowConvert: function(row) {
    if (row == null) {
      return null;
    }
    var keys = Object.keys(row);
    if (keys.length > 0) {
      var result = {};
      for (var i=0; i<keys.length; i++) {
        var currentKey = keys[i];
        var objProperty = currentKey.replace(/_[0-9a-zA-Z]/g, function(x) {return x[1].toUpperCase();});
        result[objProperty] = row[currentKey];
      }
      return result;
    }
    return null;
  }
};
