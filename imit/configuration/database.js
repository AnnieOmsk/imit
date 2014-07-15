/**
 * Database configuration
 */
var anyDB = require('any-db');
var begin = require('any-db-transaction');
var settings = require('./settings');

//Configuring database pool
var poolConfig = {
  min: settings.DB_POOL_MIN,
  max: settings.DB_POOL_MAX
};
// Database url
var dbUrl = settings.DB_TYPE + '://' + settings.DB_USER + ':' + settings.DB_PASSWORD + '@' + settings.DB_HOST +
  '/' + settings.DB_DATABASE;
// Export module
var db = {
  // database pool
  pool: anyDB.createPool(dbUrl, poolConfig),
  // transactions
  begin: begin
};

module.exports = db;