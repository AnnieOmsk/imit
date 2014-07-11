/**
 * Database pool creation
 */
var anyDB = require('any-db');
var settings = require('../../configuration/settings');

var poolConfig = {
  min: settings.DB_POOL_MIN,
  max: settings.DB_POOL_MAX
};
var dbUrl = settings.DB_TYPE + '://' + settings.DB_USER + ':' + settings.DB_PASSWORD + '@' + settings.DB_HOST +
    '/' + settings.DB_DATABASE;
var pool = anyDB.createPool(dbUrl, poolConfig);


module.exports = pool;