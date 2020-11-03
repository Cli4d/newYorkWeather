// UI variables - weekly forecast
const cDesc = document.querySelector(".weather-comment");
const cTemp = document.querySelector(".temp");
const cHumidity = document.querySelector("#humidity");
const cDewPoint = document.querySelector("#dewpoint");
const cIcon = document.querySelector("#w-icon");
const cWind = document.querySelector("#wind");
const cFeelsLike = document.querySelector("#feels-like");
const date = document.querySelector(".date");

let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};
let today = new Date();
date.textContent = today.toLocaleDateString("en-US", options);

// Weather class
class Weather {
  constructor(lat, lon) {
    this.apiKey = "2af63e193859ec031b1f4f81fb27bb61";
    this.lat = lat;
    this.lon = lon;
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&
exclude=minutely&appid=${this.apiKey}`
    );

    const respData = await response.json();
    return respData;
  }
}

function convertTemp(value) {
  let temp = value;
  temp = Math.round(temp - 273.15);
  return temp;
}

// UI Class
class UI {
  paint(weather) {
    // Current weather
    cDesc.textContent = weather.current.weather[0].description;
    cTemp.innerHTML = `${convertTemp(weather.current.temp)}&degC`;
    cIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`
    );
    cHumidity.textContent = `Relative humidity: ${weather.current.humidity}%`;
    cFeelsLike.textContent = `Feels like: ${convertTemp(
      weather.current.feels_like
    )}°C`;
    cDewPoint.textContent = `Dew point: ${weather.current.dew_point}`;
    cWind.textContent = `Wind Speed:  ${weather.current.wind_speed}m/s`;
  }
}

// Initialize weather object
const weather = new Weather(40.73061, -73.935242);

// Initialize UI object
const ui = new UI();

// Get weather when DOM loads
document.addEventListener("DOMContentLoaded", getWeather);

// get weather function
function getWeather() {
  weather
    .getWeather()
    .then(results => {
      ui.paint(results);
    })
    .catch(err => console.log(err));
}
