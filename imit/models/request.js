/**
 * Request model
 */

var request = function() {
  return {
    id: null,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    createdAt: null,
    secretCode: "",
    accepted: null
  }
};

module.exports = request;
