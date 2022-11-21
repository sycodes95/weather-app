// https://api.openweathermap.org/data/2.5/weather?q=${}&APPID=6853e2c4b792944c151fb43fba9d74ed

//https://api.ipgeolocation.io/timezone?apiKey=c542baa7031b4fbaadacd8dce5c909a9&lat=-27.4748&long=153.017

const city = document.querySelector('.weatherCity');
const date = document.querySelector('.weatherDate');
const sky = document.querySelector('.weatherSky');
const skyIcon = document.querySelector('.weatherSkyIcon');
const temperature = document.querySelector('.weatherTemperature');
const temperatureMeasurement = document.querySelector('.changeMeasurement');
const temperatureComment = document.querySelector('.weatherTemperatureComment');
const feelsLike = document.querySelector('.feelsLike');
const humidity = document.querySelector('.humidity');
const skyIconImg = document.getElementById('skyIconImg');

let chosenCity = 'London';



async function getWeather(){

    try{
        
        const res = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&APPID=6853e2c4b792944c151fb43fba9d74ed`);
        const weatherData = await res.json();

        const timeZone = await fetch (`https://api.ipgeolocation.io/timezone?apiKey=c542baa7031b4fbaadacd8dce5c909a9&lat=${getLatitude(weatherData)}&long=${getLongitude(weatherData)}`);

        const timeZoneData = await timeZone.json();

        
        
        console.log(weatherData);

        city.textContent = `${weatherData.name}`

        temperature.textContent = `${temperatureToFahrenHeit(weatherData).toFixed(0)} °F`;
        feelsLike.textContent = `${feelsLikeToFahrenHeit(weatherData).toFixed(0)} °F`;
        humidity.textContent = `${weatherData.main.humidity} %`;
        sky.textContent = `${weatherData.weather[0].main}`;

        temperatureMeasurement.addEventListener('click',()=>{
            if(temperatureMeasurement.textContent === 'Display °C'){
                temperatureMeasurement.textContent = 'Display °F';
                temperature.textContent = `${temperatureToCelcius(weatherData).toFixed(0)} °F`;
                feelsLike.textContent = `${feelsLikeToCelcius(weatherData).toFixed(0)} °F`;
            } else if (temperatureMeasurement.textContent === 'Display °F'){
                temperatureMeasurement.textContent = 'Display °C';
                temperature.textContent = `${temperatureToFahrenHeit(weatherData).toFixed(0)} °C`;
                feelsLike.textContent = `${feelsLikeToFahrenHeit(weatherData).toFixed(0)} °F`;
            }
        })

        let cityDate = new Date();
        date.textContent = cityDate.toLocaleString('en-US', {timeZone: `${timeZoneData.timezone}`});
        
        
        let currentUnix = weatherData.dt;
        let sunriseUnix = weatherData.sys.sunrise;
        let sunsetUnix = weatherData.sys.sunset;

        console.log(currentUnix)
        console.log(sunriseUnix)
        console.log(sunsetUnix)

        if (weatherData.weather[0].main === 'Rain'){
            skyIconImg.src = '/src/rain.svg';

        } else if (weatherData.weather[0].main === 'Clouds'){
            skyIconImg.src = '/src/cloud.svg';

        } else if (weatherData.weather[0].main === 'Snow'){
            skyIconImg.src = '/src/snow.svg';
            
        } else if (currentUnix > sunsetUnix || currentUnix < sunriseUnix){
            skyIconImg.src = '/src/moon.svg';
            

        } else if (currentUnix > sunriseUnix || currentUnix < sunriseUnix){
            skyIconImg.src = '/src/sun.svg';
        }

    } catch(error){
        alert('Error: Invalid city, try spacing words. Example: Los Angeles')
    }
    
}
getWeather();
    
const searchButton = document.querySelector('.magnify');
const searchInput = document.querySelector('.searchCityInput');

searchButton.addEventListener('click', ()=>{
    temperature.style.opacity = '0';
    chosenCity = searchInput.value;
    getWeather();
    temperature.style.opacity = '1';
    
});

temperature.addEventListener('change', ()=>{
    alert('change')
});

function getLatitude(weatherData){
    return weatherData.coord.lat;

}

function getLongitude(weatherData){
    return weatherData.coord.lon;
}

function feelsLikeToFahrenHeit (weatherData){
    return (weatherData.main.feels_like - 273) * 1.8 + 32;

}

function feelsLikeToCelcius (weatherData){
    return (weatherData.main.feels_like - 273.15);
}

function temperatureToFahrenHeit (weatherData){
    return (weatherData.main.temp - 273) * 1.8 + 32;

}

function temperatureToCelcius (weatherData){
    return (weatherData.main.temp - 273.15);
}

    
    
    



    


    



