// Module Dependencies
var Pass = require('../helpers/password'),
    Analyst = require('../model/analyst'),
    step = require('async');

var init = function(app) {
	// Login Page
	app.get('/', function (req, res) {
    if (req.session.user) {
      res.redirect('/dashboard');
    } else {
      var badLogin = (req.query.status == 'badLogin') ? true : false;
      res.render('index', {
        title: "SafeWater - Improving information flow for safe water in Ghana.",
        hasErrors: badLogin
      });
    }
	});

  // Login Attempt
  app.post('/', function (req, res) {
    step.waterfall([
        function(callback){
          Analyst.findByUsername(req.body.username, function (err, user) {
            if (err) callback(err);
            else if (!user) callback(null, false); // Second Argument is for the validity of the login
            else {
              var isValidLogin = Pass.validate(user.password, req.body.password);
              if (isValidLogin) callback(null, true, user);
              else callback(null, false, null);
            }
          });
        }
    ], function (err, validLogin, _user) {
      if (err || (!validLogin)) {
        res.redirect('/' + '?status=badLogin');
      }
      else {
        req.session.user = _user;
        res.redirect('/');
      }
    });
  });

  // New Analyst ##Remove Later
  // app.get('/analyst/new', function (req, res) {
  //   Analyst.save({
  //     firstname: 'Samuel',
  //     lastname: 'Ako',
  //     username: 'kozzle',
  //     password: 'bSvMUfurp49acd97afa91f652fa7a733f1974abde'
  //   }, function (err, saved) {
  //     if (err) res.send('Something went wrong');
  //     else res.send(saved);
  //   })
  // });
}

exports.init = init;