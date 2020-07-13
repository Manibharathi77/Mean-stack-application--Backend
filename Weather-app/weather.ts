
const geoCode = require('./Weather-app/geoCode.js');
const foreCast = require('./Weather-app/foreCast.js');

geoCode('Chennai', (error, data)=>{
        console.log('Lat and lon: ', data);
        foreCast(data);
});


