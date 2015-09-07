// test configuration
config = require('../config/config').init('test');
baseUrl = 'http://' + config.host + ':' + config.port;
api_prefix = config.api.prefix;

restify = require('restify');
chai = require('chai');
should = chai.should();
expect = chai.expect;

// init the test client
client = restify.createJsonClient({
    version: '*',
    url: baseUrl
});

before(function(done) {
    done();
});
