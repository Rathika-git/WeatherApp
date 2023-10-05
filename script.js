const apiKey = '2309885e360d886c2c3a6b8a2fd10b29';
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');
const errorContainer = document.querySelector('.error'); 

searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim();

  if (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          errorContainer.textContent = 'Invalid City Name';
          errorContainer.style.display = 'block';
          cityName.textContent = '';
          temperature.textContent = '';
          description.textContent = '';
          weatherIcon.style.display = 'none';
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        errorContainer.style.display = 'none';
        cityName.textContent = data.name;
        const currentTemperature = data.main.temp - 273.15;
        temperature.textContent = `Temperature: ${currentTemperature.toFixed(2)}°C`;
        description.textContent = `Weather: ${data.weather[0].description}`;
        
        const weatherCondition = data.weather[0].main;
        const iconFilename = getWeatherIconFilename(weatherCondition, currentTemperature);
        weatherIcon.src = `Images/${iconFilename}`;
      })
      .catch(error => {
        console.error(error);
      });
  }
});

function getWeatherIconFilename(weatherCondition, temperature) {
  const iconMap = {
    'Clear Sky': 'clear sky.png',
    'Partly Cloudy': 'Partly cloud.png',
    'Sunny': 'Sunny.png',
    'Rain': 'Raining.png',
    'Rain with sun': 'Rain with sun.png',
    'Thunderstorm': 'Thunder.png',
    'Mist': 'Mist.png'
  };

  return iconMap[weatherCondition] || 'default.png';
}