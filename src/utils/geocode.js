const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic3RlYmluYWxleCIsImEiOiJjazlzaDgzZHIwbXI5M2Zxa2p0dW5tOHZuIn0.BmsIxiqxjShDVDnZUTJrsg&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location, Try another search.", undefined);
    } else {
      const data = body.features[0];
      const latitude = data.center[1];
      const longitude = data.center[0];
      const location = data.place_name;
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geoCode;
