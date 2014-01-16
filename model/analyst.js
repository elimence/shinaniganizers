/*
* Module Dependencies
*/
var mongoose = require('mongoose'),
    Analyst = mongoose.model('Analyst');

function all(callback) {
  Analyst.find()
  .sort('-created_at')
  .exec(function (err, analysts) {
    if (err) callback(err);
    callback(null, analysts);
  });
}

function byUserName(username, callback) {
  Analyst.findOne({username: new RegExp(username, "i")}, function (err, analyst) {
    if (err) callback(err);
    else callback(null, analyst);
  });
}

function save(analysts, callback) {
  analysts = (analysts instanceof Array) ? analysts : [analysts];
  Analyst.create(analysts, function (err) {
    if (err) callback(err);
    else {
      var saved = Array.prototype.slice.call(arguments, 1);
      callback(null, saved);
    }
  });
}


exports.save = save;
exports.all = all;
exports.findByUsername = byUserName;