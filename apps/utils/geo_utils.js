var unirest = require('unirest');


var GeoUtils = {
    getCountryByGeo: function(geo, callback) {
        var lat = geo[0];
        var lon = geo[1];
        
        unirest.get('http://maps.googleapis.com/maps/api/geocode/json')
            .headers({'Accept': 'application/json'})
            .query({
                latlng: geo.join(','),
                sensor: false
            })
            .end(function (response) {
                // console.log('Google Map geo result', response.body);
                countryCode = null;
                if (response.body.results) {
                    response.body.results.map(function(result) {
                        if (result.address_components) {
                            var components = result.address_components;
                            if (components.length > 0) {
                                components.map(function(component) {
                                    var types = component.types;
                                    if (types && types.length > 0 && types.indexOf('country') >= 0) {
                                        countryCode = component.short_name;
                                    }
                                });
                            }
                        }
                    });
                }
                if (countryCode != null) {
                    callback(null, countryCode);
                } else {
                    callback('Failed to fetch country code by geo location ' + geo.join(','));
                }
            });
    },

    getCountryByIp: function(ip, callback) {
        unirest.get('http://www.telize.com/geoip/' + ip)
            .headers({'Accept': 'application/json'})
            .end(function(response) {
                console.log('Telize geo ip result', response.body);
                if (response.body && response.body.country_code) {
                    callback(null, response.body.country_code);
                    return;
                }
                callback('Failed to fetch country code by IP ' + ip);
            });
    }
}

module.exports = GeoUtils;
