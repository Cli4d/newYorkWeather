// UI variables - current weather data
const cDesc = document.querySelector(".weather-comment");
const cTemp = document.querySelector(".temp");
const cIcon = document.querySelector("#w-icon");
const cHumidity = document.getElementById("humidity");
const cWind = document.getElementById("wind");
const cFeelsLike = document.getElementById("feels-like");
const cDewPoint = document.getElementById("dewpoint");
const cDate = document.querySelector(".date");

// UI variables - weekly forecast
const wTemp = document.querySelectorAll(".w-temp");
const wIcon = document.querySelectorAll(".w-icon");
const wComment = document.querySelectorAll(".w-comment");
const wTime = document.querySelectorAll(".w-time");

// Date
let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};

let today = new Date();

// Post current date on UI
cDate.textContent = today.toLocaleDateString("en-US", options);

// Weather class
class Weather {
  constructor(lat, lon) {
    this.apiKey = api;
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
    cTemp.textContent = `${convertTemp(weather.current.temp)}°C`;
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

    // Weekly weather forecast
    // for (let i = 0; i <= 7; i++) {
    //   wTemp[i].textContent = `${convertTemp(weather.daily[i].temp)}°C`;
    //   wIcon[i].setAttribute(
    //     "src",
    //     `http://openweathermap.org/img/wn/${weather.daily[i].weather[0].icon}@2x.png`
    //   );
    //   wComment[i].textContent = weather.daily[i].weather[0].description;
    // }
    console.log(wTemp);
    console.log(wIcon);
    console.log(wComment);
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
      // let milliseconds = (results.current.dt + results.timezone_offset) * 1000;
      // let date = new Date(milliseconds);
      // let dateNow = date.toUTCString();
      // const display = dateNow.split(",");
      console.log(results);
      ui.paint(results);
    })
    .catch(err => console.log(err));
}
