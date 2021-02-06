const request = require('request')

const forecast = (lat,lon, callback) => {
    // const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=02267bd259161c86149f729ef7167184`;
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(lon)+'&units=metric&exclude={part}&appid=02267bd259161c86149f729ef7167184';
    
  request({ url, json: true }, (err, { body}) => {
    if (err) {
      callback("Unable to load data!"); 
    } else if (body.message) {
      callback("Unable to load location!");
    } else {
      const data = body.current;
      const desc = data.weather[0];
      callback(undefined,
        `${desc.description} ,There is ${data.temp} Degree Celsius .It feels like ${data.feels_like} C out there.`
      );
    }
  });
};
module.exports = forecast;


