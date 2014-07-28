/**
 * Request validator tests
 */
var assert = require('assert');
var validator = require('../../../services/validators/request');

exports.module = {

  testCorrect: function(test) {
    var form = {
      firstName: "Ivan",
      lastName: "Petrov",
      email: "test@test.com",
      password: "testtest",
      passwordRepeated: "testtest"
    };
    var errors = validator.requestValidator(form);
    test.ok((errors == null), "Validation should not fire error, all data is correct");
    test.done();
  },

  testNotCorrect: function(test) {
    var form = {
      firstName: "Ivan",
      lastName: "Petrov",
      email: "test@test.com",
      password: "test",
      passwordRepeated: "test"
    };
    var errors = validator.requestValidator(form);
    test.ok((errors.password != null), "Validation should fire error, password is too short");
    test.done();
  }
};