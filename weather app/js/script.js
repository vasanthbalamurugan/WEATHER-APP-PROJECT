// weather app
const apiKey = "3ac4618494d4bae02beed4554af80b08";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == "404") {
    document.querySelector(".error").textContent =
      "City not found, Please enter a valid city name";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "../assets/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "../assets/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "../assets/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "../assets/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "../assets/mist.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

checkWeather();

searchbtn.addEventListener("click", () => {
  const city = searchbox.value.trim();
  if (city) {
    const regex = /^[a-zA-Z\s]+$/;
    if (regex.test(city)) {
      checkWeather(city);
    } else {
      document.querySelector(".error").textContent =
        "Invalid city name. Please enter a valid name.";
      document.querySelector(".weather").style.display = "none";
    }
  } else {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").textContent = "Please enter a city name";
  }
});
