/**
 * Module dependencies.
 */
var express   = require('express'),
    http      = require('http'),
    path      = require('path'),
    app       = express(),
    fs        = require('fs');

// Initialize DB
require('./model/db');

// App Config
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "simplify" }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
}); // Configs End

// Locate and Load Routes
var routesDir = 'routes',
    routeFiles = fs.readdirSync(routesDir);

routeFiles.forEach(function(file) {
  var filePath = path.resolve('./', routesDir, file),
      route = require(filePath);
  route.init(app);
}); // Done Loading Routes

// Start The Server
http.createServer(app).listen(app.get('port'), function(){
  console.log("App up and running @ " + app.get('port'));
});