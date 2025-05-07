const weatherContainer = document.querySelector(".weather");
const error = document.querySelector(".error");
const btn = document.querySelector("button");
const input = document.querySelector("input");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");
const description = document.querySelector(".desc");

const loader = document.querySelector(".loader-container");


import { API_KEY, API_URL } from "./config.js";



function capitalizeFirstLetterOfEachWord(str) {
  return str.split(' ') .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); 
}



function displayWeatherData(data) {
  temp.innerHTML = Math.round(data.main.temp) + "°C";
  city.innerHTML = data.name;
  windSpeed.innerHTML = data.wind.speed + " km/h";
  humidity.innerHTML = data.main.humidity + "%";
  description.innerHTML = capitalizeFirstLetterOfEachWord(data.weather[0].description);

  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main === "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main === "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main === "Snow") {
    weatherIcon.src = "images/snow.png";
  } else if (data.weather[0].main === "Mist") {
    weatherIcon.src = "images/mist.png";
  } else if (data.weather[0].main === "Haze") {
    weatherIcon.src = "images/haze.png";
  } else if (data.weather[0].main === "Dust") {
    weatherIcon.src = "images/dust.png";
  } else if (data.weather[0].main === "Fog") {
    weatherIcon.src = "images/fog.png";
  } else if (data.weather[0].main === "Sand") {
    weatherIcon.src = "images/sand.png";
  } else if (data.weather[0].main === "drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main === "thunderstorm") {
    weatherIcon.src = "images/thunderstorm.png";
  } else if (data.weather[0].main === "sunny") {
    weatherIcon.src = "images/sunny.png";
  }
}

async function getWeatherData(cityName) {
  if (!cityName) {
    console.error("City name is required");
    return;
  }

  try {
    error.style.display = "none";
    loader.style.display = "block";
    weatherContainer.style.display = "none";
    const response = await fetch(API_URL + cityName + `&appid=${API_KEY}`);

    if (response.status === 404) {
      error.style.display = "block";
      weatherContainer.style.display = "none";
      return;
    } else {
      const data = await response.json();
      console.log(data);
      displayWeatherData(data);

      error.style.display = "none";
      weatherContainer.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    error.style.display = "block";
    return null;
  } finally {
    loader.style.display = "none";
  }
}

btn.addEventListener("click", () => {
  const value = input.value;
  input.value = "";
  if (value === "") {
    alert("Please enter a city name");
    return;
  } else {
    getWeatherData(value);
  }
});