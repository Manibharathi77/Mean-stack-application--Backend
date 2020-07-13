

const request = require('request');

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)
        +".json?access_token=pk.eyJ1IjoibWFuaWJoYXJhdGhpNzciLCJhIjoiY2tjamQ3aWg2MWtpMjJ6cGJwYTV3ejY1aiJ9._9yWq8DL9QKsU8SHCk6KUw";

    request({url: url, json: true } , (error, response) => {
        if(error){
            callback('unable to connect to location service. Try Again..', undefined);
        } else if(response.body.features.length === 0){
            callback('unable to find location for the give address. Try Another..', undefined);
        } else {
            callback('No error', {
                latitude:response.body.features[0].center[0],
                longitude:response.body.features[0].center[1],
                Location:response.body.features[0].place_name,
            });
        }
    })
};

module.exports = geoCode;
