/**
 * Validation for graduate forms
 */

var validator = require('../../../services/validators/graduate');

exports.module = {

  testLiveCorrect: function(test){
    var form = {
      fullName: "Ivan Petrov",
      _fieldout: "fullName"
    };
    var errors = validator.graduateLive(form);
    test.ok((errors == null), "Validation should not fire error if you leave first field when first field is filled");
    test.done();
  },

  testLiveFieldNotFilled: function(test){
    var form = {
      fullName: "Ivan Petrov",
      img: "filled",
      occupancy: "",
      _fieldout: "occupancy"
    };
    var errors = validator.graduateLive(form);
    test.ok((errors.occupancy != null), "Validation should fire occupancy error");
    test.done();
  },

  testSaveCorrect: function(test) {
    var form = {
      fullName: "Ivan Petrov",
      imgOld: "filled",
      occupancy: "test",
      department: "test",
      graduatedIn: "test",
      lead: "test",
      fullLead: "test",
      text: "test",
      _fieldout: "fullName"
    };
    var errors = validator.graduateSave(form);
    test.ok((errors == null), "Validation should not fire error, all data is correct");
    test.done();
  },

  testSaveNotFilled: function(test) {
    var form = {
      fullName: "Ivan Petrov",
      img: "filled",
      occupancy: "test",
      department: "test",
      graduatedIn: "test",
      lead: "test",
      fullLead: "test",
      text: "",
      _fieldout: "fullName"
    };
    var errors = validator.graduateSave(form);
    test.ok((errors.text != null), "Validation should fire error, text field not filled");
    test.done();
  }
};

