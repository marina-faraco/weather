const form = document.querySelector(".search");
const input = document.querySelector(".search input");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const city = input.value;

    getWeather(city);
   
});

function getWeather(city) {
    const apiKey = "36274a895aea62c5cc82644413e5e924";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(Response => Response.json())
        .then(data => {

            if (data.cod !== 200) {
                alert("City not found");
                return;
            }

            const temp = document.querySelector(".temperature");
            const cityName = document.querySelector(".city");
            const desc = document.querySelector(".description");
            const icon = document.querySelector(".todays-icon")

            icon.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            temp.textContent = Math.round(data.main.temp) + "°";
            cityName.textContent = data.name;
            desc.textContent = data.weather[0].description;

            input.value = "";        
            
            getForecast(city);

        });
        
    };

function getForecast(city) {
    const apiKey = "36274a895aea62c5cc82644413e5e924";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            
            const forecastDays = data.list.filter(item => item.dt_txt.includes("12:00:00"));

            const dayElements = document.querySelectorAll(".day");

            forecastDays.slice(0, 5).forEach((dayData, index) => {

                const temp = Math.round(dayData.main.temp);
                const icon = dayData.weather[0].icon;
                const date = new Date(dayData.dt_txt);
                
                const dayName = date;toLocaleDateString("en-US", {weekday: "short"});

                dayElements[index].querySelector(".day-name").textContent = dayName;

                dayElements[index].querySelector(".day-temp").textContent = temp + "°";

                dayElements[index].querySelector(".day-icon").src=`https://openweathermap.org/img/wn/${icon}.png`;
            
            })

        });

};