const axios = require('axios');

const forwardcast = (latitude, longitude, callback) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=51dda0554f874fcc31a30b68d9c0bb2c&units=metric`;
    axios.get(apiUrl)
        .then(response => {
            callback(undefined, {
                dt: response.data.dt,
                timezone: response.data.timezone,
                country: response.data.sys.country,
                name: response.data.name,
                temperature: response.data.main.temp,
                feelslike: response.data.main.feels_like,
                humidity: response.data.main.humidity,
                pressure: response.data.main.pressure,
                visibility: response.data.visibility,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon
            });
        })
        .catch(error => {
            if (error.response)
                callback(`Unable to find location, Error code: ${error.response.data.cod}`, undefined);
            else
                callback(`Unable to connect to weather service, ${error.message}`, undefined);
        })
};

module.exports = forwardcast;