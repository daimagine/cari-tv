/**
  * Application configuration based on environment variable
  **/
module.exports = {
    singleton: null,
    init: function(env) {
        this.singleton = this[env];
        return this.singleton;
    },
    get: function() {
        return this.singleton;
    },
    development: {
        root: require('path').normalize(__dirname + '/../'),
        app: {
            name: 'TV Listing app',
            version: '0.0.1'
        },
        api: {
            prefix: '/api/v1/'
        },
        host: 'localhost',
        port: 3000
    },
    test: {
        root: require('path').normalize(__dirname + '/../'),
        app: {
            name: 'TV Listing app',
            version: '0.0.1'
        },
        api: {
            prefix: '/api/v1/'
        },
        host: 'localhost',
        port: 3001
    },
}
