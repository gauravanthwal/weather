const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZ2F1cmF2LWFudGh3YWw3NCIsImEiOiJja2txcTBlbmowNmNoMndwYzYzNWdncTN4In0.TGETtUDT_GcOwcwOGMyLpw&limit=1";
  request({ url, json: true }, (err, { body}) => {
    if (err) {
      callback("Unable to load data!", undefined);
    } else if (body.message) {
      callback(`Unable to find location`);
    } else {
      callback(undefined, {
        lattitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
