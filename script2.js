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

// Use an object mapping to simplify icon selection
const iconMap = {
  Clouds: "assets/cloudy.png",
  Clear: "assets/clear.png",
  Rain: "assets/rainy.png",
  Drizzle: "assets/drizzle.png",
  Mist: "assets/misty.png",
  Snow: "assets/snowy.png",
};

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      errorMsg.style.display = "block";
      weatherInfo.style.display = "none";
      return;
    }

    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    errorMsg.style.display = "block";
    weatherInfo.style.display = "none";
  }
}

function updateWeatherUI(data) {
  cityElement.innerHTML = data.name;
  tempElement.innerHTML = Math.round(data.main.temp) + "&#176;F";
  humidityElement.innerHTML = data.main.humidity + "%";
  // Imperial units return wind speed in mph
  windElement.innerHTML = data.wind.speed + " mph";

  // Set the weather icon using iconMap; use a default if not found
  weatherIcon.src = iconMap[data.weather[0].main] || "assets/default.png";

  weatherInfo.style.display = "block";
  errorMsg.style.display = "none";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
