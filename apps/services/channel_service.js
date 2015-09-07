var async = require('async')
    , externalip = require('public-ip')
    , GeoUtils = require('../utils/geo_utils');


var ChannelService = {
    getChannels: function(params, callback) {
        console.log('ChannelService: get channel by params', params);
        async.waterfall([
            function(callback) {
                if (params.l && params.l.length > 0) {
                    // get country code by geo, and then get channels by country
                    var geo = params.l.split(',');
                    console.log('ChannelService: async geo', geo);
                    ChannelService.getCountryByGeo(geo, callback);
                    
                } else {
                    // get country by IP, and then get channels by IP
                    var ip = params.ip;
                    console.log('ChannelService: async ip', ip);
                    ChannelService.getCountryByIp(ip, callback);
                }
            },
            function(countryCode, callback) {
                console.log('ChannelService: async country code', countryCode);
                ChannelService.getChannelsByCountry(countryCode, callback);
            }
        ], function(err, result) {
            callback(err, result)
        });
    },

    getCountryByGeo: function(geo, callback) {
        console.log('ChannelService: get country by geo location', geo);
        if (geo.length == 2) {
            GeoUtils.getCountryByGeo(geo, callback);
        } else {
            callback('Failed to parse geo location');
        }
    },

    getCountryByIp: function(ip, callback) {
        console.log('ChannelService: get country by ip', ip);
        if (ip == '127.0.0.1') {
            console.log('ChannelService: get external IP address');
            externalip(function (err, ip) {
                if (err) {
                    console.log(err);
                    callback('Failed to fetch external IP address');
                }
                GeoUtils.getCountryByIp(ip, callback);
            });
        } else {
            GeoUtils.getCountryByIp(ip, callback);
        }
    },

    getChannelsByCountry: function(countryCode, callback) {
        console.log('ChannelService: get country by code', countryCode);
        var channels = [];
        // TODO: replace dummy data with real data
        var channelDb = require('../utils/channel_db');
        if (channelDb && channelDb.length > 0) {
            // console.log('ChannelService: channel db', channelDb);
            channelDb.map(function(channel) {
                if (channel.available_countries.indexOf(countryCode) >= 0) {
                    channels.push(channel);
                }
            });
        }
        console.log('ChannelService: channels', channels);
        callback(null, channels);
    }
}

module.exports = ChannelService;
