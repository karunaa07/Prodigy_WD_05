const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-btn");
const locationInput = document.getElementById("location-input");
const weatherCard = document.getElementById("weather-card");
const errorMessage = document.getElementById("error-message");

// Display Elements
const cityName = document.getElementById("city-name");
const weatherDesc = document.getElementById("weather-description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

const API_KEY = "e5b573e174c3121134403c647fe27ceb";

// Fetch weather data based on city name
async function getWeatherByCity(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError();
    }
}

// Fetch weather data using geolocation
async function getWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError();
    }
}

// Display Weather Data
function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    weatherDesc.textContent = data.weather[0].description;
    temperature.textContent = data.main.temp;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;

    errorMessage.classList.add("hidden");
    weatherCard.classList.remove("hidden");
}

// Handle Errors
function showError() {
    weatherCard.classList.add("hidden");
    errorMessage.classList.remove("hidden");
}

// Event Listeners
searchBtn.addEventListener("click", () => {
    const city = locationInput.value.trim();
    if (city) getWeatherByCity(city);
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoords(latitude, longitude);
            },
            () => showError()
        );
    } else {
        showError();
    }
});
