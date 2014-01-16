/*
* Module Dependencies
*/
var mongoose 		= 		require('mongoose'),
		Schema 			= 		mongoose.Schema,
    step = require('async');

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

// Analyst Schema
var AnalystSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

// StatusReport Schema
var StatusReportSchema = new Schema({
  location: {
    type: Schema.ObjectId,
    ref: 'Location'
  },
  leakagestatus: String,
  functional: String,
  flowrate: Number,
  sender: {
    type: Schema.ObjectId,
    ref: 'FieldOfficer'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Status Reports Class Method
StatusReportSchema.statics.stats = function (callback) {
  var Reports = mongoose.model('StatusReport');
  step.parallel([
    function(callback){
      Reports.count({leakagestatus: new RegExp('y', 'gi')}, function (err, count) {
        if (err) callback(err);
        else callback(null, count);
      });
    },
    function(callback){
      Reports.count({leakagestatus: new RegExp('n', 'gi')}, function (err, count) {
        if (err) callback(err);
        else callback(null, count);
      });       
    }
  ],
  // optional callback
  function (err, stats){
    if (err) callback(err);
    else {
      stats[stats.length] = stats[0] + stats[1];
      callback(null, stats);
    }
  });
}

// Location Schema
var LocationSchema = new Schema({
  identifier: String,
  name: String,
  description: String,
  region: String,
  district: String,
  constituency: String,
  lat: Number,
  lng: Number,
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Location Instance Method
LocationSchema.methods.fullname = function () {
  return this.name + ', ' + this.district + ', ' + this.region;
}

// Compile Schemas into Models
mongoose.model( 'FieldOfficer', FieldOfficerSchema );
mongoose.model( 'Analyst', AnalystSchema );
mongoose.model( 'Location', LocationSchema );
mongoose.model( 'StatusReport', StatusReportSchema );