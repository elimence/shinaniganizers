// Module Dependencies
// var Pass = require('../helpers/password'),
//     Analyst = require('../model/analyst'),
//     step = require('async');

var init = function(app) {
  // Login Page
  app.get('/dashboard', function (req, res) {
    if (req.session.user) {
      console.log(req.session.user);
      res.render('dashboard', {
        title: "SafeWater - View reports on water sources.",
        user: req.session.user
      });
    } else {
      res.redirect('/');
    }
  });
}

exports.init = init;