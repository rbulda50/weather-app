import Notiflix from 'notiflix';
import axios from 'axios';

const refs = {
    weatherBtn: document.querySelector('.weather-btn'),
    weatherInput: document.querySelector('.weather-input'),
    weatherContainer: document.querySelector('.weather-container'),
};

refs.weatherBtn.addEventListener('click', onFindWeatherOfCity);

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'bff3b02653de3236c205c9ed174b3c69';

async function fetchWeather(value) {
    try {
        const options = {
            params: {
                appid: API_KEY,
                units: "metric",
                q: `${value}`,
            }
        }
        const response = await axios(BASE_URL, options);
        return response.data;
    } catch (error) {
        console.log(error);
    };
};

async function onFindWeatherOfCity(e) {
    e.preventDefault();
    const value = refs.weatherInput.value.trim();
    // console.log(value);
    if (value) {
        const response = await fetchWeather(value);
        createWeatherMarkup(response);
        refs.weatherInput.value = '';
    }
};

function createWeatherMarkup(data) {
    try {
        // console.log(data);
        const markup = `
        <div class="weather-container__data">
            <div class="weather-container__icon">
                <p class="weather-container__country">Country: ${data.sys.country}</p>
                <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}" />
            </div>
            <p class="weather-container__city">City: ${data.name}</p>    
            <p class="weather-container__temp">Temperature: ${data.main.temp.toFixed()}°C</p>
            <p class="weather-container__pressure">Pressure: ${data.main.pressure} mm Hg</p>
            <p class="weather-container__wind">Wind: ${data.wind.speed.toFixed(1)} m/s</p>
        </div>
        `
        refs.weatherContainer.innerHTML = markup;
        Notiflix.Notify.success(`${data.name} was found!`);
    } catch (error) {
        Notiflix.Notify.failure("Try a different name :(");
        onSearchFail();
    };
};

function onSearchFail() {
    refs.weatherContainer.innerHTML = '';
};