/**
 * Test for services/validators/admin.js
 */

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var validator = require('../../../services/validators/admin');

exports.module = {

  testCorrect: function(test){
    var form = {
      email: "test@test.com",
      password: "fff"
    };
    var errors = validator.adminLogin(form);
    test.ok((errors == null), "Login validation should not fire any error on correct credentials");
    test.done();
  },

  testIncorrectEmail: function(test){
    var form = {
      email: "test@test",
      password: "fff"
    };
    var errors = validator.adminLogin(form);
    test.ok((errors.email != null), "Login validation should fire email error");
    test.done();
  }
};
