const apiKey = "43c5be2a715f8f592c34ab2a884fc29c";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=";

const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherInfo = document.querySelector(".weather");
const errorMsg = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status === 404) {
    errorMsg.style.display = "block";
    weatherInfo.style.display = "none";
  } else {
    var data = await response.json();

    cityElement.innerHTML = data.name;
    tempElement.innerHTML = Math.round(data.main.temp) + "&#176;F";
    humidityElement.innerHTML = data.main.humidity + "%";
    windElement.innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "assets/cloudy.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "assets/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "assets/rainy.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "assets/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "assets/misty.png";
    } else if (data.weather[0].main === "Snow") {
      weatherIcon.src = "assets/snowy.png";
    }

    weatherInfo.style.display = "block";
    errorMsg.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
