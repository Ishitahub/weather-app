const { useState } = React;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'f16f8a4bbd431a43cfb054282c9e88d4';

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
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
    } finally {
      setLoading(false);
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
        <button onClick={fetchWeather} disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
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
