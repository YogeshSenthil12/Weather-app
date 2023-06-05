//https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=770ee330bcaf064c80af652e74c17739

let API_KEY = "770ee330bcaf064c80af652e74c17739";

getWeatherData = async (city) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather';

    const full_url = `${url}?q=${city}&appid=${API_KEY}&units=metric`;
    const weatherPromise = fetch(full_url);
    const response = await weatherPromise;
    return await response.json();
}

function searchCity(){
    const city = document.getElementById('cityInput').value;

    getWeatherData(city)
    .then((response) =>{
        if(response.cod === "404" || response.message === "city not found"){
            showWeatherData(null, 'city not found');
        }
        else{
            showWeatherData(response, null);
            console.log(response);
        }
    })
    .catch((error) =>{
        console.log(error);
    })
}

showWeatherData = (weatherData, errorMessage) => {
    console.log(weatherData);
    if (errorMessage) {
        document.getElementById("cityName").innerText = errorMessage;
        document.getElementById(" weatherInfo").style.display = "none";
    } else {
        document.getElementById("cityName").innerText = weatherData.name;
        document.getElementById("weatherHead").innerText = weatherData.weather[0].main;
        document.getElementById("weatherType").src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        document.getElementById("temp").innerText = `Temperature : ${weatherData.main.temp} °C`;
        document.getElementById("minTemp").innerText = `Min Temp: ${weatherData.main.temp_min} °C`;
        document.getElementById("maxTemp").innerText = `Max Temp: ${weatherData.main.temp_max} °C`;
        document.getElementById("Humidity").innerText = `Humidity: ${weatherData.main.humidity} %`;
        document.getElementById("windSpeed").innerText = `windSpeed: ${weatherData.wind.speed} km/h`;
        document.getElementById("seaLevel").innerText = `seaLevel: ${weatherData.main.sea_level  ? weatherData.main.sea_level +'mts above' : '-'}`;
    }

    const weatherDataContainer = document.querySelector(".weatherInfo");
    weatherDataContainer.style.display = "block";
}