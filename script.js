
const weatherBtn = document.getElementById('weather-btn');
const weatherModal = document.getElementById('weather-modal');
const closeWeatherModal = document.getElementById('close-weather-modal');
const weatherLocation = document.getElementById('weather-location');
const weatherDescription = document.getElementById('weather-description');
const weatherTemperature = document.getElementById('weather-temperature');
const weatherTime = document.getElementById('weather-time');
weatherBtn.addEventListener('click', () => {
  // Use the OpenWeatherMap API to fetch weather data
  const apiKey = 'f85e072ff99a8c16be6da49bded55bcf';
  const city = 'Kolkata';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(url)
    .then(response => {
      console.log('API Response:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('API Data:', data);
      if (!data || !data.name || !data.weather || !data.main) {
        throw new Error('Invalid API response');
      }
      const temperatureInCelsius = data.main.temp - 273.15;
      weatherLocation.textContent = data.name;
      weatherDescription.textContent = data.weather[0].description;
      weatherTemperature.textContent = `Temperature: ${temperatureInCelsius.toFixed(2)}°C`;
      weatherTime.textContent = `Time: ${new Date().toLocaleTimeString()}`;
      weatherModal.style.display = 'block';
    })
    .catch(error => {
      console.error('Error:', error);
      weatherLocation.textContent = 'Error';
      weatherDescription.textContent = 'Failed to load weather data';
      weatherTemperature.textContent = '';
      weatherTime.textContent = '';
      weatherModal.style.display = 'block';
    });
});


closeWeatherModal.addEventListener('click', () => {
  weatherModal.style.display = 'none';
});

// Update the time every second
setInterval(() => {
  weatherTime.textContent = `Time: ${new Date().toLocaleTimeString()}`;
}, 1000);
