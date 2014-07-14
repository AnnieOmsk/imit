/**
 * Request model
 */

function Request() {
  this.id = null;
  this.email = "";
  this.password = "";
  this.firstName = "";
  this.lastName = "";
  this.createdAt = null;
  this.secretCode = "";
  this.accepted = null;
}

Request.prototype.load = function(obj) {
  if (obj !== undefined) {
    this.id = obj.id;
    this.email = obj.email;
    this.password = obj.password;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.createdAt = obj.createdAt;
    this.secretCode = obj.secretCode;
    this.accepted = obj.accepted;
  }
  return this;
};

module.exports = Request;
