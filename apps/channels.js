/**
  * Channel modules
  */
var restify = require('restify')
    , config = require('../config/config').get()
    , api_prefix = config.api.prefix
    ;


module.exports = function(app) {
    /**
      * Get all channels
      */
    function getChannels(req, res, next) {
        // TODO: get all channels
        var err = new restify.errors.InternalServerError('Unimplemented endpoints');
        return next(err);
    }

    // Setup routes

    app.get(api_prefix + '/channels', getChannels);
}
