/*
* Module Dependencies
*/
var mongoose 		= 		require('mongoose'),
		Schema 			= 		mongoose.Schema;

// Connect to the database
var dbUriString = 	process.env.MONGOLAB_URI || process.env.MONGOHQ_URL  || 'mongodb://localhost/births';

mongoose.connect(dbUriString, function (err, conn) {
	if (err) {
		console.log('ERROR connecting to: ' + dbUriString + '. ' + err);
		console.log('Shutting down now...');
		process.exit(0);
	} else {
		console.log ('Successfully connected to: ' + dbUriString);
	}
});

// Schema & Model Definitions


// Compile Schemas into Models
// mongoose.model( 'Director', DirectorSchema );