// test configuration
config = require('../config/config').init('test');
baseUrl = 'http://' + config.host + ':' + config.port;

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
    console.log('01: start test server');
    done();
});
