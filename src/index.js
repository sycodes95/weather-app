// https://api.openweathermap.org/data/2.5/weather?q=${}&APPID=6853e2c4b792944c151fb43fba9d74ed

const city = document.querySelector('.weatherCity');
const date = document.querySelector('.weatherDate');
const sky = document.querySelector('.weatherSky');
const temperature = document.querySelector('.weatherTemperature');
const temperatureMeasurement = document.querySelector('.changeMeasurement');
const temperatureComment = document.querySelector('.weatherTemperatureComment');
const feelsLike = document.querySelector('.feelsLike');
const humidity = document.querySelector('.humidity');


async function getWeather(){
    const res = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=London&APPID=6853e2c4b792944c151fb43fba9d74ed`);
    const weatherData = await res.json();
    console.log(weatherData)

    let fahrenheit = (weatherData.main.feels_like - 273) * 1.8 + 32; 
    console.log(fahrenheit)

    feelsLike.textContent = `${(weatherData.main.feels_like - 273) * 1.8 + 32 }`;

    
}
getWeather();