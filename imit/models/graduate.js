/**
 * Graduate model
 */

function Graduate() {
  this.id = null;
  this.name = "";
  this.img = "";
  this.occupancy = "";
  this.department = "";
  this.lead = "";
  this.text = "";
  this.createdAt = null;
}

Graduate.prototype.load = function(obj) {
  if (obj !== undefined) {
    this.id = obj.id;
    this.name = obj.name;
    this.img = obj.img;
    this.occupancy = obj.occupancy;
    this.department = obj.department;
    this.lead = obj.lead;
    this.text = obj.text;
    this.createdAt = obj.createdAt;
  }
  return this;
};

module.exports = Graduate;
