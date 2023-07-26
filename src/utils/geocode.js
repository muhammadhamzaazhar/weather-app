const axios = require('axios');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibS1oYW16YS0wMDciLCJhIjoiY2xrOTlqeHlvMGUzdTNkbzcwMWxuOHFqaiJ9.wr7Ezt9u6Qzm8IPreSPwBA&limit=1`
    axios.get(url)
        .then(({ data }) => {
            if (data.features.length === 0)
                callback('Unable to find location. Try another search!', undefined);
            else
                callback(undefined, {
                    longitude: data.features[0].center[0],
                    latitude: data.features[0].center[1],
                    location: data.features[0].place_name
                })
        })
        .catch(error => {
            callback('Unable to connect to location services', undefined);
        })
};

module.exports = geocode;