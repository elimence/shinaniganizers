// Module Dependencies
var mongoose = require('mongoose'),
    Report = require('../model/statusReport');

var init = function(app) {
  // Login Page
  app.get('/map', function (req, res) {
    if (req.session.user) {
      var pumpStatus = req.query.kind || 'all';
      var pumpStatus = (pumpStatus == 'working') ? 'n' : ((pumpStatus == 'faulty') ? 'y' : pumpStatus);

      Report.findByPumpStatus(pumpStatus, function (err, reports) {
        if (err) res.send('Something went wrong');
        else {
          res.render('map', {
            title: "SafeWater - Showing" + req.query.kind + " pump sites.",
            reports: reports,
            kind: req.query.kind,
            user: req.session.user
          });
        }
      });

      // step.parallel([
      //   function(callback){
      //     Location.all(function (err, locations) {
      //       if (err) callback(err);
      //       else callback(null, locations);
      //     });
      //   }, 
      //   function(callback){
      //     Report.findByPumpStatus(pumpStatus, function (err, reports) {
      //       if (err) callback(err);
      //       else callback(null, reports);
      //     });
      //   }
      // ],
      // // optional callback
      // function (err, data){
      //   res.render('reports', {
      //     title: "SafeWater - Showing" + req.query.kind + " pump sites.",
      //     locations: data[0],
      //     reports: data[1],
      //     kind: req.query.kind,
      //     user: req.session.user
      //   });
      // });
    } else {
      res.redirect('/');
    }
  });
}

exports.init = init;