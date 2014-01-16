// Module Dependencies
var mongoose = require('mongoose');

var init = function(app) {
	// Index Page
	app.get('/', function (req, res) {
    res.send('Welcome');
	});
}

exports.init = init;