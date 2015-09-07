/**
 * Main application server setup
 **/

var cmdlineEnv = process.argv[2];
console.log('Env: ' + cmdlineEnv);

if (cmdlineEnv && cmdlineEnv.length > 0) {
    if (cmdlineEnv == '-d' || cmdlineEnv.toUpperCase() == '--DEVELOPMENT') {
        process.env.NODE_ENV = 'development';
    } else if (cmdlineEnv == '-p' || cmdlineEnv.toUpperCase() == '--PRODUCTION') {
        process.env.NODE_ENV = 'production';
    } else if (cmdlineEnv == '-t' || cmdlineEnv.toUpperCase() == '--TEST') {
        process.env.NODE_ENV = 'test';
    }
}

// Load configurations
var env = process.env.NODE_ENV || 'development'
    , config = require('./config/config').init(env);

// Modules
var restify = require('restify')
    , fs = require('fs')
    , preflightEnabler = require('se7ensky-restify-preflight');

// Paths
var config_path = config.root + 'config';

// Configure restify server
var app = restify.createServer({
    name: 'tv-listing',
    version: config.version
});

app.on('error', function(err) {
    if (err.errorno == 'EADDRINUSE') {
        console.log('Port already in use');
        process.exit(1);
    } else {
        console.log(err);
    }
});

// use query parser
app.use(restify.queryParser());

// allows authenticated cross domain requests
preflightEnabler(app);

// Application routes
require(config_path + '/routes')(app);

// Start server
var port = process.env.PORT || config.port;
app.listen(port, function() {
    console.log('Server start on port ' + port);
});

