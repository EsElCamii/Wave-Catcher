import React, { useEffect, useState } from "react";
import "./App.css";

const getWaveStatus = (height) => {
  if (height < 0.65) return "❌";
  if (height < 0.85) return "〰️";
  if (height < 1.5) return "✅";
  return "⭐️";
};

const popularBeaches = [
  { name: "Bondi Beach", lat: "-33.8915", long: "151.2767" },
  { name: "Waikiki", lat: "21.2761", long: "-157.8242" },
  { name: "Huntington Beach", lat: "33.6595", long: "-117.9988" },
  // Add more beaches as needed
];

export default function App() {
  const [waveData, setWaveData] = useState([]);
  const [latitude, setLatitude] = useState("19.1809");
  const [longitude, setLongitude] = useState("-96.1429");

  useEffect(() => {
  const fetchWaveHeight = async () => {
    const url =
      `https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&hourly=wave_height&timezone=America/Los_Angeles`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.hourly) return;

      const formatted = data.hourly.time.map((time, idx) => ({
        time,
        height: data.hourly.wave_height[idx],
      }));
      
      formatted.sort((a, b) => new Date(a.time) - new Date(b.time)); // Sort by time ascending
      setWaveData(formatted);
    } catch (err) {
      console.error("Error fetching wave height:", err);
    }
  };

  fetchWaveHeight();
}, [latitude, longitude]); //Initiates and depends on Lat and Long

  const formatHour = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' };
    return date.toLocaleString('en-US', options);
  };

return (
  <div className="wave-container">
    <h2 className="wave-title">🌊 Wave Height</h2>
    <div className="coordinates-display">
      <p>Latitude: {latitude}, Longitude: {longitude}</p>
    </div>
    <div className="input-container">
      <input 
        type="text" 
        className="input-field"
        placeholder="Latitude" 
        value={latitude} 
        onChange={(e) => setLatitude(e.target.value)} 
      />
      <input 
        type="text" 
        className="input-field"
        placeholder="Longitude" 
        value={longitude} 
        onChange={(e) => setLongitude(e.target.value)} 
      />
    </div>
    <div className="popular-places">
      {popularBeaches.map(beach => (
        <button 
          key={beach.name} 
          className="beach-button" 
          onClick={() => {
            setLatitude(beach.lat);
            setLongitude(beach.long);
          }}
        >
          {beach.name}
        </button>
      ))}
    </div>
    {waveData.length === 0 && <p>Loading…</p>}
    <div className="card-grid">
      {waveData.map((entry, i) => (
        <div key={i} className="wave-card">
          <div>
            <p className="wave-time">{formatHour(entry.time)}</p>
            <p className="wave-height">{entry.height} m</p>
          </div>
          <div className="status-card">
            <p>{getWaveStatus(entry.height)}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
