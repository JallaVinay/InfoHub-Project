import { useState } from "react";
import NavBar from "./NavBar";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async (e) => {
    e.preventDefault();
    setError("");
    setData(null);

    if (!city.trim()) {
      setError("Enter city name");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://infohub-peoject-backend.onrender.com/weather?city=${encodeURIComponent(city)}`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      setData(json);
    } catch {
      setError("City not found or API error");
    }
    setLoading(false);
  };

  return (
    <>
      {" "}
      <NavBar />
      <div className="weather-page">
        <div className="weather-container">
          <h1>Weather</h1>

          <form onSubmit={getWeather} className="weather-form">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Loading..." : "Get Weather"}
            </button>
          </form>

          {error && <p className="weather-error">{error}</p>}

          {data && (
            <div className="weather-result">
              <p>
                <strong>City:</strong> {data.city}, {data.country}
              </p>
              <p>
                <strong>Temperature:</strong> {data.temperatureC}°C
              </p>
              <p>
                <strong>Humidity:</strong> {data.humidityPct}%
              </p>
              <p>
                <strong>Wind:</strong> {data.windSpeedMs} m/s
              </p>
              <p>
                <strong>Condition:</strong> {data.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
