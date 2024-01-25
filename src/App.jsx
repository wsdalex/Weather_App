import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  //Take user input and search for location
  //set location
  //call weather api and get weather
  //render current weather
  const [location, setLocation] = useState([]);
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);

  const apiKey = "7f5ac72c104616aa33dd624b9f2e2a45";
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=3&appid=${apiKey}`;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`;

  const getLocation = async () => {
    try {
      const response = await fetch(geoUrl);
      const data = await response.json();
      console.log(data[0]);
      setLocation(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getWeather = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    getLocation();

    setInput("");
  };

  return (
    <div className="bg-sky-500">
      <form
        className="flex flex-col justify-around h-40"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="bg-gray-300 mx-3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="text-white bg-sky-700 rounded mx-3">
          Search
        </button>
      </form>
      {weather ? (
        <div className="flex flex-col items-center">
          <h3>{location.name}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather?.[0]?.description}
          />
          <h4>{weather.weather?.[0]?.description}</h4>
        </div>
      ) : (
        <div>Please search above</div>
      )}
    </div>
  );
}

export default App;
