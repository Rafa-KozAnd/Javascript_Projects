document.getElementById('getWeatherButton').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Erro ao buscar previsão do tempo:', error);
    }
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.innerHTML = '';

    if (data.cod !== 200) {
        weatherContainer.innerHTML = '<p>Cidade não encontrada. Por favor, tente novamente.</p>';
        return;
    }

    const weather = document.createElement('div');
    weather.classList.add('weather');

    const city = document.createElement('h2');
    city.textContent = `${data.name}, ${data.sys.country}`;
    weather.appendChild(city);

    const description = document.createElement('p');
    description.textContent = `Clima: ${data.weather[0].description}`;
    weather.appendChild(description);

    const temperature = document.createElement('p');
    temperature.textContent = `Temperatura: ${data.main.temp} °C`;
    weather.appendChild(temperature);

    const humidity = document.createElement('p');
    humidity.textContent = `Humidade: ${data.main.humidity}%`;
    weather.appendChild(humidity);

    const wind = document.createElement('p');
    wind.textContent = `Vento: ${data.wind.speed} m/s`;
    weather.appendChild(wind);

    weatherContainer.appendChild(weather);
}
