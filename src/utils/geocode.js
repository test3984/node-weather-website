const request = require('request');
const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2xpY2UiLCJhIjoiY2swMnJ5NHNvMDNnNjNicG5xczBramYwYSJ9.tr12B_j5A087O6YJUDk5Qg&limit=1`;
    request({ url, json: true }, (err, response, body) => {
        if (err) {
            callback('Unable to connect to geocoding service!', undefined);
            return;
        } else if (response.statusCode === 401) {
            callback('Wrong API token', undefined);
            return;
        } else if (body.features.length === 0) {
            callback('Can not find the given location', undefined);
            return;
        }

        const latitude = body.features[0].center[1];
        const longitude = body.features[0].center[0];
        const location = body.features[0].place_name;

        callback(undefined, {
            latitude,
            longitude,
            location
        });
    });
}

module.exports = geoCode;