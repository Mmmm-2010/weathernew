import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // GEO API
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );

      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found");
        setWeather(null);
        return;
      }

      const location = geoData.results[0];

      // WEATHER API
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature`
      );

      const weatherData = await weatherRes.json();

      setWeather({
        city: location.name,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude,
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        wind: weatherData.current.wind_speed_10m,
        feelsLike: weatherData.current.apparent_temperature,
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  return (
    <div className="app">
      <Navbar />

      <section className="hero">
        <h1>Build with Weather Data</h1>
        <p>From real-time forecasts to 47+ years of global climate history.</p>

        <div className="buttons">
          <button className="orange">Get API Key</button>
          <button className="transparent">View Pricing</button>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search City..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={getWeather}>Search</button>
        </div>

        {loading && <h2>Loading...</h2>}
        {error && <h3>{error}</h3>}

        {weather && (
          <>
            <div className="weather-card">
              <h2>
                {weather.city}, {weather.country}
              </h2>

              <h1>{weather.temperature}°C</h1>

              <div className="details">
                <p>Feels Like: {weather.feelsLike}°C</p>
                <p>Humidity: {weather.humidity}%</p>
                <p>Wind: {weather.wind} km/h</p>
              </div>
            </div>

            <div className="map-container">
              <iframe
                title="google-map"
                width="100%"
                height="400"
                style={{
                  border: 0,
                  borderRadius: "20px",
                  marginTop: "20px",
                }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${weather.latitude},${weather.longitude}&z=12&output=embed`}
              />
            </div>
          </>
        )}

        <div className="forecast">
          <div className="day active">Today 24° 🌦</div>
          <div className="day">Wed 24° 🌧</div>
          <div className="day">Thu 20° ⛅️</div>
          <div className="day">Fri 19° 🌦</div>
          <div className="day">Sat 19° 🌧</div>
          <div className="day">Sun 15° 🌦</div>
        </div>
      </section>

      <section className="weather-info-section">
        <h2>Trusted By</h2>
        <p>Access current weather, forecasts and historical data worldwide.</p>

        <section className="trusted">
          <div className="trusted-logos">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="Spotify" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" />
          </div>
        </section>
      </section>

      <section className="stats-section">
        <div className="stat-box">200K+ Developers</div>
        <div className="stat-box">190+ Countries</div>
        <div className="stat-box">99.9% Uptime</div>
        <div className="stat-box">2B+ Requests</div>
      </section>

      <section className="pricing-section">
        <h2>Choose Your Plan</h2>

        <div className="pricing-cards">
          <div className="price-card">
            <h3>Free Plan</h3>
            <label><input type="checkbox" /> Current Weather</label>
            <label><input type="checkbox" /> Forecast Data</label>
          </div>

          <div className="price-card">
            <h3>Pro Plan</h3>
            <label><input type="checkbox" /> Historical Data</label>
            <label><input type="checkbox" /> API Access</label>
          </div>

          <div className="price-card">
            <h3>Enterprise</h3>
            <label><input type="checkbox" /> Unlimited Requests</label>
            <label><input type="checkbox" /> Priority Support</label>
          </div>
        </div>
      </section>

      <section className="api-section">
        <h2>Choose Weather Data</h2>
      </section>

      <footer className="cta-footer">
        <h2>All-in-One Weather Data, One Simple Call</h2>
        <p>Access real-time weather, forecasts, alerts and historical data via API.</p>

        <div className="footer-buttons">
          <button className="footer-btn primary">Start Free</button>
          <button className="footer-btn secondary">Explore Docs</button>
        </div>
      </footer>

      <Footer />
    </div>
  );
}

export default App;