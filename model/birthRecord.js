/*
* Module Dependencies
*/
var mongoose = require('mongoose'),
    BirthRecord = mongoose.model('BirthRecord');

function all(callback) {
  BirthRecord.find()
  .sort('-created_at')
  .exec(function (err, records) {
    if (err) callback(err);
    callback(null, records);
  });
}

function save(records, callback) {
  records = (records instanceof Array) ? records : [records];
  BirthRecord.create(records, function (err) {
    if (err) callback(err);
    else {
      var saved = Array.prototype.slice.call(arguments, 1);
      callback(null, saved);
    }
  });
}

exports.save = save;
exports.all = all;