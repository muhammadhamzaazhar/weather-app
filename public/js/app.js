const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#weatherIcon');
const messageFour = document.querySelector('#message-4');
const messageFive = document.querySelector('#message-5');
const messageSix = document.querySelector('#message-6');
const messageSeven = document.querySelector('#message-7');
const date = document.querySelector('#date');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    date.textContent = 'Loading..';
    messageOne.textContent = '';
    messageThree.textContent = '';
    messageTwo.textContent = '';
    messageFour.textContent = '';
    messageFive.textContent = '';
    messageSix.textContent = '';
    messageSeven.textContent = '';
    fetch(`/weather?address=${location}`)
        .then(response => {
            response.json().then(data => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    date.textContent = time(data.forecast.dt, data.forecast.timezone);
                    messageOne.textContent = `${data.location}, ${data.forecast.country}`;
                    messageThree.textContent = populateWeatherIcon(data.forecast.icon);
                    messageTwo.textContent = `${Math.ceil(data.forecast.temperature)}°C`;
                    messageFour.textContent = `Feels like ${Math.ceil(data.forecast.feelslike)}°C. ${data.forecast.description.charAt(0).toUpperCase() + data.forecast.description.slice(1)}`;
                    messageFive.textContent = `Pressure: ${data.forecast.pressure}hPa`;
                    messageSix.textContent = `Humidity: ${data.forecast.humidity}%`;
                    messageSeven.textContent = `Visibility: ${data.forecast.visibility / 1000}km`;
                }
            })
        }
        )
})

function populateWeatherIcon(iconCode) {
    const weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
    weatherIcon.alt = "Weather Icon";
};

const time = (dt, timeZone) => {
    const timestamp = dt;
    const milliseconds = timestamp * 1000
    const dateTime = new Date(milliseconds);
    const toUTC = dateTime.getTime() + dateTime.getTimezoneOffset() * 60000
    const currentLocalTime = toUTC + 1000 * timeZone;
    const selectedDate = new Date(currentLocalTime);

    const options = {
        //weekday: 'long', 
        // year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
        //   timeZoneName: 'short' 
    };
    const formattedDate = selectedDate.toLocaleString('en-US', options);
    return formattedDate;
};
