const request = require("request");

const foreCast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ede6c29682476a076710e64b2209b5f3&query=${lat},${long}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = body.current;
      const { temperature, feelslike, weather_descriptions } = data;
      callback(
        undefined,
        weather_descriptions +
          " It is currently " +
          temperature +
          " degress out. It feels like " +
          feelslike +
          " degrees."
      );
    }
  });
};

module.exports = foreCast;
