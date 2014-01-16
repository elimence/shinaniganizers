/*
* Module Dependencies
*/
var mongoose = require('mongoose'),
    StatusReport = mongoose.model('StatusReport'),
    FieldOfficer = require('../model/fieldOfficer'),
    Location = require('../model/location'),
    step = require('async');

function all(callback) {
  StatusReport.find()
  .sort('-created_at')
  .exec(function (err, statusReports) {
    if (err) callback(err);
    else callback(null, statusReports);
  });
}

function byPumpStatus(pumpStatus, callback) {

  function augmentData(item, callback) { // This adds location and sender information to the existing info
    step.parallel([
      function(callback){
        Location.findByInternalID(item.location, function (err, location) {
          if (err) callback(err);
          else {
            callback(null, location);
          }
        });
      }, 
      function(callback){
        FieldOfficer.findByInternalID(item.sender, function (err, officer) {
          if (err) callback(err);
          else callback(null, officer);
        });        
      }
    ],
    // optional callback
    function (err, data){
      if (err) callback(err);
      else { // Augnment NOW!
        var augmentedData = { 
          leakagestatus: item['leakagestatus'],
          functional: item['functional'],
          flowrate: item['flowrate'],
          _id: item['_id'],
          location: data[0],
          sender: data[1],
          created_at: item['created_at']
        };
        console.log(augmentedData);
        callback(null, augmentedData);
      }
    });
  }

  if (pumpStatus != 'y' && pumpStatus != 'n') {
    pumpStatus = '.+';
  }
  StatusReport.find({leakagestatus: new RegExp(pumpStatus, 'gi')})
  .sort('-created_at')
  .exec(function (err, statusReports) {
    if (err) callback(err);
    else {
      step.map(statusReports, augmentData, function(err, results){
          if (err) callback(err);
          else callback(null, results)
      });
    }
  });
}

function save(statusReports, callback) {
  statusReports = (statusReports instanceof Array) ? statusReports : [statusReports];
  StatusReport.create(statusReports, function (err) {
    if (err) callback(err);
    else {
      var saved = Array.prototype.slice.call(arguments, 1);
      callback(null, saved);
    }
  });
}

exports.save = save;
exports.all = all;
exports.findByPumpStatus = byPumpStatus;