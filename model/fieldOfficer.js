/*
* Module Dependencies
*/
var mongoose = require('mongoose'),
    FieldOfficer = mongoose.model('FieldOfficer');

function all(callback) {
  FieldOfficer.find()
  .sort('-created_at')
  .exec(function (err, officers) {
    if (err) callback(err);
    callback(null, officers);
  });
}

function save(officers, callback) {
  officers = (officers instanceof Array) ? officers : [officers];
  FieldOfficer.create(officers, function (err) {
    if (err) callback(err);
    else {
      var saved = Array.prototype.slice.call(arguments, 1);
      callback(null, saved);
    }
  });
}

function byPhone(phone, callback) {
  FieldOfficer.find()
  .where('phone')
  .equals(phone)
  .exec(function (err, officers) {
    if (err) callback(err);
    else callback(null, officers[0]);
  });
}

exports.save = save;
exports.all = all;
exports.findByPhone = byPhone;