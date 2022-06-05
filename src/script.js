let now = new Date();
let dateToday = document.querySelector("#dateToday");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
dateToday.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city.value}`;
  let apiKey = "b6c769756646411c438f6a04abe73a94";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function displayWeatherCondition(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let weatherDescription = document.querySelector("#current-weather");
  weatherDescription.innerHTML = response.data.weather[0].main;
  let minTemp = document.querySelector("#low");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  let maxTemp = document.querySelector("#high");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
}

//get current position
function searchLocation(position) {
  let apiKey = "b6c769756646411c438f6a04abe73a94";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let showCurrentLocation = document.querySelector("#currentLocation");
showCurrentLocation.addEventListener("click", getCurrentLocation);
