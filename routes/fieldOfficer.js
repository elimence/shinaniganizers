// Module Dependencies
var FieldOfficer = require('../model/fieldOfficer');

var init = function(app) {
  // Fetch Field Officer Account Creation Form
  app.get('/officers/register', function (req, res) {
    res.send('Will display form here');
    // FieldOfficer.save({
    //   firstname: 'Test',
    //   lastname: 'Officer',
    //   region: 'Greater Accra',
    //   district: 'Ledzokuku Krowor',
    //   municipality: 'Kpeshie South',
    //   community: 'Teshie',
    //   phone: '+12065551212',
    //   username: 'testofficer',
    //   password: 'Cs68uY4kT2d4c8a3dc30f7f6d43257e1aaa459507'
    // }, function (err, saved) {
    //   if (err) res.send(err);
    //   else res.send(saved);
    // });
  });
}

exports.init = init;