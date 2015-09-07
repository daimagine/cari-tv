/**
  * Channel modules
  */
var restify = require('restify')
    , config = require('../../config/config').get()
    , api_prefix = config.api.prefix;

var ChannelService = require('../services/channel_service');


module.exports = function(app) {
    /**
      * Get all channels
      */
    function getChannels(req, res, next) {
        var params = req.query;
        console.log('Query params: ', params);

        // get remote address ip
        params.ip = req.connection.remoteAddress;

        ChannelService.getChannels(params, function(err, channels) {
            if (err) {
                console.log(err);
                return next(new restify.errors.InternalServerError(err));
            }
            res.send({ 
                message: 'Success',
                channels: channels
            });
        });
    }

    // Setup routes

    app.get(api_prefix + '/channels', getChannels);
}
