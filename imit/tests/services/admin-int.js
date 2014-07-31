/**
 * Admin Service integration tests
 */
var assert = require('assert');
var service = require('../../services/admin');
var util = require('util');

describe('Admin service tests',function(){

  it('There should not be any error', function(done){
    var promise = service.findAdmin("test@test");
    promise.then(function(res) {
      console.log(util.inspect(res));
      assert.equal(null, res);
      done();
    }).catch(function(err) {
        done(err);
    });
  });
});