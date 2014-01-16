// Module Dependencies
var mongoose = require('mongoose'),
    Reporting = mongoose.model('StatusReport'),
    Report = require('../model/statusReport'),
    Location = require('../model/location'),
    step = require('async');

var init = function(app) {
  // Dashboard Home
  app.get('/dashboard', function (req, res) {
    if (req.session.user) {
      step.parallel([
        function(callback){
          Location.all(function (err, locations) {
            if (err) callback(err);
            else callback(null, locations);
          });
        }, 
        function(callback){
          Reporting.stats(function (err, stats) {
            if (err) callback(err);
            else {
              callback(null, {
                faulty: stats[0],
                working: stats[1],
                total: stats[2]
              });
            } 
          });        
        }
      ],
      // optional callback
      function (err, data){
        // console.log(data[1][0]);
        res.render('dashboard', {
          title: "SafeWater - View reports on water sources.",
          locations: data[0],
          stats: data[1],
          user: req.session.user
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Dashboard Reports
  app.get('/dashboard/reports', function (req, res) {
    var pumpStatus = req.query.kind || 'all';
    var pumpStatus = (pumpStatus == 'working') ? 'n' : ((pumpStatus == 'faulty') ? 'y' : pumpStatus);
    // Report.findByPumpStatus(pumpStatus, function (err, reports) {
    //     if (err) res.send('Something went wrong.');
    //     else res.send(reports);
    //   });
    if (req.session.user) {
      var pumpStatus = req.query.kind || 'all';
      var pumpStatus = (pumpStatus == 'working') ? 'n' : ((pumpStatus == 'faulty') ? 'y' : pumpStatus);

      // Report.findByPumpStatus(pumpStatus, function (err, reports) {
      //   if (err) res.send('Something went wrong.');
      //   else res.send(reports);
      // });

      step.parallel([
        function(callback){
          Location.all(function (err, locations) {
            if (err) callback(err);
            else callback(null, locations);
          });
        }, 
        function(callback){
          Report.findByPumpStatus(pumpStatus, function (err, reports) {
            if (err) callback(err);
            else callback(null, reports);
          });
        }
      ],
      // optional callback
      function (err, data){
        res.render('reports', {
          title: "SafeWater - Showing" + req.query.kind + " pump sites.",
          locations: data[0],
          reports: data[1],
          kind: req.query.kind,
          user: req.session.user
        });
      });
    } else {
      res.redirect('/');
    }
  });
}

exports.init = init;