const form = document.querySelector(".search");
const input = document.querySelector(".search input");

let unit = "celsius";
let currentTemp = null;
let forecastData = [];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const city = input.value;

    getWeather(city);
   
});

/* Pegar localização do user */
function getUserLocation() {
    if (!navigator.geolocation) {
        showError("Location not supported by your browser");
        return;
    }

    document.querySelector(".city").textContent = "Detecting location...";

    navigator.geolocation.getCurrentPosition(success, error, {
        timeout: 5000
    });
}

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    getWeatherByCoords(lat, lon);
}

function error() {
    getWeather("São Paulo");
}

/* Clima de acordo com a localização do user */
function getWeatherByCoords(lat, lon) {
    const apiKey = "36274a895aea62c5cc82644413e5e924";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            const cityName = document.querySelector(".city");
            const desc = document.querySelector(".description");
            const icon = document.querySelector(".todays-icon");

            icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            currentTemp = data.main.temp;
            updateTemperature();

            cityName.textContent = data.name;
            desc.textContent = data.weather[0].description;

            getForecast(data.name);
        });
}

/* Clima atual (cidade escolhida) */
function getWeather(city) {
    const apiKey = "36274a895aea62c5cc82644413e5e924";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.cod !== 200) {
                showError("City not found. Try another name.");
                return;
            }

            hideError()

            const cityName = document.querySelector(".city");
            const desc = document.querySelector(".description");
            const icon = document.querySelector(".todays-icon")

            icon.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            currentTemp = data.main.temp;
            updateTemperature();

            cityName.textContent = data.name;
            desc.textContent = data.weather[0].description;

            input.value = "";        
            
            getForecast(city);

        });
        
    };

/* Previsão dos próximos  5 dias*/
function getForecast(city) {
    const apiKey = "36274a895aea62c5cc82644413e5e924";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            
            const forecastDays = data.list.filter(item => item.dt_txt.includes("12:00:00"));

            forecastData = forecastDays.slice(0, 5);

            updateForecast();
            
            });

    }

/* Alterar entre °c e °f*/
function updateTemperature() {
    if (currentTemp === null) return;

    let temp;

    if (unit === "celsius") {
        temp = currentTemp;
    } else {
        temp = (currentTemp * 9/5) + 32;
    }

    document.querySelector(".temperature").textContent = Math.round(temp) + "°";
}

/* Renderizar forecast */
function updateForecast() {

    const dayElements = document.querySelectorAll(".day");

    forecastData.forEach((dayData, index) => {
        let temp = dayData.main.temp;

        if (unit === "fahrenheit") {
            temp = (temp * 9/5) + 32;
        }

        const icon = dayData.weather[0].icon;
        const date = new Date(dayData.dt_txt);
        
        const dayName = date.toLocaleDateString("en-US", {weekday: "short"});

        dayElements[index].querySelector(".day-name").textContent = dayName;

        dayElements[index].querySelector(".day-temp").textContent = Math.round(temp) + "°";

        dayElements[index].querySelector(".day-icon").src=`https://openweathermap.org/img/wn/${icon}.png`;

    });
}

/* Alterar entre °c e °f*/
const celsiusBtn = document.getElementById("cels");
const fahrBtn = document.getElementById("fahr");

celsiusBtn.addEventListener("click", function() {

    unit = "celsius";

    celsiusBtn.classList.add("active");
    fahrBtn.classList.remove("active");

    updateTemperature();
    updateForecast();
});

fahrBtn.addEventListener("click", function() {
    
    unit = "fahrenheit";

    fahrBtn.classList.add("active");
    celsiusBtn.classList.remove("active");

    updateTemperature();
    updateForecast();
});

function showError(message) {
    const error = document.querySelector(".error-message")
    error.textContent = message;
    error.style.display = "block";
}

function hideError() {
    const error = document.querySelector(".error-message");
    error.style.display = "none";
}

input.addEventListener("input", hideError);
getUserLocation();
