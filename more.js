// UI variables - weekly forecast
const wTemp = document.querySelectorAll(".w-temp");
const wIcon = document.querySelectorAll(".w-icon");
const wComment = document.querySelectorAll(".w-comment");
const wTime = document.querySelectorAll(".w-time");

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
    // Weekly weather forecast
    for (let i = 0; i <= 7; i++) {
      wTemp[i].textContent = `${convertTemp(
        (weather.daily[i].temp.max + weather.daily[i].temp.min) / 2
      )}°C`;
      wIcon[i].setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${weather.daily[i].weather[0].icon}@2x.png`
      );
      wComment[i].textContent = weather.daily[i].weather[0].description;
    }
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
    .then((results) => {
      console.log(results);
      ui.paint(results);
    })
    .catch((err) => console.log(err));
}
