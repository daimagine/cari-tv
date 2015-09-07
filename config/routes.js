/**
  * Application routes configuration
  **/
var restify = require('restify')
    , fs = require('fs')
    , config = require('./config').get()
    , config_path = config.root + '/config'
    , apps_path = config.root + '/apps';

module.exports = function(app) {
    /**
      * Default API route
      */
    app.get('/', function(req, res) {
        res.send({ message: 'Success' });
    });
    
    /**
      * Ping API server
      */
    app.get('/api', function(req, res) {
        res.send({ message: 'Success' });
    });

    // load application routes from apps_path
    require(apps_path + '/channels.js')(app);
}
