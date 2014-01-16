// Module Dependencies
var mongoose = require('mongoose'),
    FieldOfficer = require('../model/fieldOfficer'),
    BirthRecord = require('../model/birthRecord');

var init = function(app) {
  // Incoming message as part of a started/ongoing registration
  app.post('/message', function (req, res) {
    if (req.body && req.body.phone && req.body.values) {
      // Does a field officer with this number exist
      FieldOfficer.findByPhone(req.body.phone, function (err, officer) {
        if (err) res.json(500, {message: 'Something went wrong!'}); // Error fetching officer
        else {
          if (officer) {
            var birthRecord = {},
                data = JSON.parse(req.body.values);

            // Create a Birth Record Object for Saving to the DB
            birthRecord['sender'] = officer._id; // Store Reference to the Officer
            data.forEach(function (item) {
              birthRecord[item['label']] = item['value'];
            });

            BirthRecord.save(birthRecord, function (err, saved) {
              if (err) res.json(500, {message: 'Something went wrong!'}); // Error saving record
              else {
                console.log('Record Saved');
                res.json(200, { message: 'Registration Received. Thank you' });
              }
            })
          } else {
            res.json(400, {message: 'Unrecognized Field Officer'}); // Officer Doesn't Exist
          }
        }
      });
    }
  });
}

exports.init = init;