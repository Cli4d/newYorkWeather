// UI variables - current weather data
const cDesc = document.querySelector(".weather-comment");
const cTemp = document.querySelector(".temp");
const cIcon = document.querySelector("#w-icon");
const cHumidity = document.getElementById("humidity");
const cWind = document.getElementById("wind");
const cFeelsLike = document.getElementById("feels-like");
const cDewPoint = document.getElementById("dewpoint");
const cDate = document.querySelector(".date");

// UI variables - hourly weather data
const hTemp = document.querySelectorAll("#future-forecast .h-temp");
const hTime = document.querySelectorAll("#future-forecast .time");
const hIcon = document.querySelectorAll("#future-forecast .h-icon");

// UI variables - weekly forecast
const wTemp = document.querySelectorAll("#weekly-forecast .w-temp");
const wIcon = document.querySelectorAll("#weekly-forecast .w-icon");
const wComment = document.querySelectorAll("#weekly-forecast .w-comment");
const wTime = document.querySelectorAll("#weekly-forecast .w-time");
// Date
let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
let today = new Date();

// Post current date on UI
cDate.textContent = today.toLocaleDateString("en-US", options); // Saturday, September 17, 2016

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
    // let temp = convertTemp(weather.current.temp);
    cTemp.textContent = `${convertTemp(weather.current.temp)}°C`;
    cIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`
    );
    cHumidity.textContent = `Relative humidity: ${weather.current.humidity}%`;
    cFeelsLike.textContent = `Feels like: ${weather.current.feels_like}K`;
    cDewPoint.textContent = `Dew point: ${weather.current.dew_point}`;
    cWind.textContent = `Wind Speed: ${weather.current.wind_speed}m/s`;

    // Hourly weather forecast
    console.log(weather);
    for (let i = 0; i <= 5; i++) {
      for (let c = 0; c <= 48; c += 4) {
        let locTime = `${new Date(
          weather.hourly[c].dt - weather.timezone_offset
        ).getHours()}:${new Date(
          weather.hourly[c].dt - weather.timezone_offset
        ).getMinutes()}`;
        hTime[i].textContent = locTime;
        hTemp[i].textContent = `${convertTemp(weather.hourly[c].temp)}°C`;
        hIcon[i].setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${weather.hourly[c].weather[0].icon}@2x.png`
        );
      }
    }

    // Weekly weather forecast
  }
}

// Initialize weather object
const weather = new Weather(40.73061, -73.935242);

// Initialize UI object
const ui = new UI();

// Get weather when dom loads
document.addEventListener("DOMContentLoaded", getWeather);

// get weather function
function getWeather() {
  weather
    .getWeather()
    .then((results) => {
      ui.paint(results);
    })
    .catch((err) => console.log(err));
}
