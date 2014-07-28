/**
 * Home controller integration tests
 */
var app = require('../../../../app');
var assert = require('assert');
var http = require('http');
var PORT = 6667;
var util = require('util');

describe('Main controllers tests',function(){

  before(function(done){
    var server = app.listen(PORT, function() {
      console.log('Express server listening on port ' + server.address().port);
    });
    done();
  });

  it('should return 200', function (done) {
    http.get('http://localhost:' + PORT + '/graduates.html', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });

});