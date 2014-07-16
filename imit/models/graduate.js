/**
 * Graduate model
 */

function Graduate() {
  this.id = null;
  this.fullName = "";
  this.img = "";
  this.occupancy = "";
  this.department = "";
  this.graduatedIn = "";
  this.lead = "";
  this.fullLead = "";
  this.text = "";
  this.createdAt = null;
}

Graduate.prototype.load = function(obj) {
  if (obj !== undefined) {
    this.id = obj.id;
    this.fullName = obj.fullName;
    this.img = obj.img;
    this.occupancy = obj.occupancy;
    this.department = obj.department;
    this.graduatedIn = obj.graduatedIn;
    this.lead = obj.lead;
    this.fullLead = obj.fullLead;
    this.text = obj.text;
    this.createdAt = obj.createdAt;
  }
  return this;
};

module.exports = Graduate;
