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
// Field Officers
var FieldOfficerSchema = new Schema({
  firstname: String,
  lastname: String,
  region: String,
  district: String,
  municipality: String,
  community: String,
  phone: String,
  username: String,
  password: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Birth Records
var BirthRecordSchema = new Schema({
  fullname: String,
  placeofbirth: String,
  dateofbirth: String,
  gender: String,
  mothersmaidenname: String,
  sender: {
    type: Schema.ObjectId,
    ref: 'FieldOfficer'
  },
  hasCertificate: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Compile Schemas into Models
mongoose.model( 'FieldOfficer', FieldOfficerSchema );
mongoose.model( 'BirthRecord', BirthRecordSchema );