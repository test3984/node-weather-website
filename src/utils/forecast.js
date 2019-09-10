const request = require('request');
const forecast = ({latitude, longitude}, callback) => {
    const url = `https://api.darksky.net/forecast/03653742cd5d8ba5241eaee00f3899a2/${latitude},${longitude}?units=si&lang=de`;
    request({ url, json: true }, (err, response, body) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined);
            return;
        } else if (response.statusCode === 400) {
            callback('Bad Request!', undefined);
            return;
        }
    
        const currently = response.body.currently;
        console.log(currently);
        callback(undefined, `${response.body.daily.data[0].summary} It is currently ${currently.temperature}°C out. There is a ${currently.precipProbability}% chance of rain. The humidity is ${currently.humidity * 100}%.`);
    });
}

module.exports = forecast;