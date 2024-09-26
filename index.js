//import axios from 'axios'; // for ES6 modules

function refreshweather(response) {
  let city = document.querySelector('#city');
  let time = document.querySelcetor('#time');
  let description = document.querySelector('#description');
  let humidity = document.querySelector('#humidity');
  let windspeed = document.querySelector('#windspeed');
  let temperature = document.querySelector('#temperature');
  let temperatureE = response.data.temperature.current;
  let icon = document.querySelector('#icon');
  let date = new Date(response.data.time * 1000);

  city.innerHTML = response.data.city;
  time.innerHTML = formatDate(date);
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.condition.humidity}%`;
  windspeed.innerHTML = `${response.data.wind.speed}km/h`;
  temperature.innerHTML = response.data.temperature.current;
  icon.innerHTML = `<img src="${response.data.condition.icon_url} class="weather-app-icon"/>`;
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${minutes} ${hour}`;
}
function searchCity(city) {
  let apikey = 'bfb8dee3b64aeba3tfoa0a66bc4f26df';
  let apiurl = `https://api.shecodes.io/weather/v1/current?query=${city}key=${apikey}&units=metrics`;
  axios.get(apiurl).then(refreshweather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector('#search-form-input');

  searchCity(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = 'b2a5adcct04b33178913oc335f405433';
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecastHtml = '';

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
  
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}º</div>
          </div>
        </div>
      `;
    }
  });

  let forecastElement = document.querySelector('#forecast');
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector('#search-form-button');
searchFormElement.addEventListener('submit', handleSearchSubmit);

searchCity('Paris');
displayForecast(forecast);
