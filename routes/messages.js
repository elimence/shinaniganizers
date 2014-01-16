// Module Dependencies
var mongoose = require('mongoose'),
    Location = require('../model/location'),
    FieldOfficer = require('../model/fieldOfficer'),
    StatusReport = require('../model/statusReport');

var init = function(app) {
  // Incoming message as part of a started/ongoing registration
  app.post('/report', function (req, res) {
    if (req.body && req.body.phone && req.body.values) {
      function getLocationID(data) {
        var locationID = null;
        data.forEach(function (item) {
          if (item['label'] == 'locationid') {
            locationID = item['value'];
          }
        });
        return locationID;
      }

      // Does a field officer with this number exist
      FieldOfficer.findByPhone(req.body.phone, function (err, officer) {
        if (err) res.json(500, {message: 'Something went wrong!'}); // Error fetching officer
        else {
          if (officer) {
            // console.log(JSON.parse(req.body.values));
            // console.log(req.body);
            // res.json(200, { message: 'Registration Received. Thank you' });



            var statusReport = {},
                data = JSON.parse(req.body.values);

            var locationID = getLocationID(data);
            Location.findByID(getLocationID(data), function (err, location) {
              if (err) res.json(500, {message: 'Something went wrong!'});
              else {
                if (location) {
                  // Create a Status Report Object for Saving to the DB
                  statusReport['sender'] = officer._id; // Store Reference to the Officer
                  statusReport['location'] = location._id; // Store Reference to the Location
                  data.forEach(function (item) {
                    if (item['label'] != 'locationid') {
                      statusReport[item['label']] = item['value'];
                    }
                  });

                  StatusReport.save(statusReport, function (err, saved) {
                    if (err) res.json(500, {message: 'Something went wrong!'}); // Error saving record
                    else {
                      console.log('Report Saved');
                      res.json(200, { message: 'Report Received. Thank you' });
                    }
                  })
                } else {
                  res.json(400, {message: 'Bad Data Received'});
                }
              }
            });   
          } else {
            res.json(400, {message: 'Unrecognized Field Officer'}); // Officer Doesn't Exist
          }
        }
      });
    }
  });
}

exports.init = init;