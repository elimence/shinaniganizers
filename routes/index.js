// Module Dependencies
var mongoose = require('mongoose');

var init = function(app) {
	// Index Page
	app.get('/', function (req, res) {
    if (req.session.user) {
      res.redirect('/dashboard');
    } else {
      var badLogin = (req.query.status == 'badLogin') ? true : false;
      res.render('index', {
        title: "BirthsReport - An Automated Births Registry for Ghana's hard to reach.",
        hasErrors: badLogin
      });
    }
	});
}

exports.init = init;