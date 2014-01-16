/*
* Module Dependencies
*/
var mongoose = require('mongoose'),
    Location = mongoose.model('Location');

function all(callback) {
  Location.find()
  .sort('-created_at')
  .exec(function (err, locations) {
    if (err) callback(err);
    callback(null, locations);
  });
}

function byID(identifier, callback) {
  Location.findOne({identifier: new RegExp(identifier, "i")}, function (err, location) {
    if (err) callback(err);
    else callback(null, location);
  });
}

function byInternalID(id, callback) {
  Location.findById(id, function (err, location) {
    if (err) callback(err);
    else callback(null, location);
  });
}

function save(locations, callback) {
  locations = (locations instanceof Array) ? locations : [locations];
  Location.create(locations, function (err) {
    if (err) callback(err);
    else {
      var saved = Array.prototype.slice.call(arguments, 1);
      callback(null, saved);
    }
  });
}

exports.save = save;
exports.all = all;
exports.findByID = byID;
exports.findByInternalID = byInternalID;