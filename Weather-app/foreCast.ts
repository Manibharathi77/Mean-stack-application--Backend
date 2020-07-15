
const request = require('request');

const forecast = ({latitude, longitude}, callback) => {
   // const latitude = data.latitude;
   // const longitude = data.longitude;

    const url = 'http://api.weatherstack.com/current?access_key=5b6226c16c1daee2124d9a3272e5a1dd&query=' + latitude+ ',' + longitude;

    request({url: url, json:true} , (error, response) => {
        console.log(response.body);
        callback(response.body);
    })
};

module.exports = forecast;
