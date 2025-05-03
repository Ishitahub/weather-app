const { useState } = React;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
        alert('City not found');
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching weather data.');
    }
  };

  return (
    <div>
      <h1>Weather Now</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].main}</p>
          <p>{Math.round(weather.main.temp)}°C</p>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
