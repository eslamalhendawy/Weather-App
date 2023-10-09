import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import notFound from "./Images/404.png";
import clear from "./Images/clear.png";
import cloud from "./Images/cloud.png";
import mist from "./Images/mist.png";
import rain from "./Images/rain.png";
import snow from "./Images/snow.png";

function App() {
  const [city, setCity] = useState("");
  // const [classList, setClassList] = useState("container container-height1");
  const container = useRef(0);
  const weatherBox = useRef(0);
  const weatherDetails = useRef(0);
  const error = useRef(0);
  const [weatherImage, setWeatherImage] = useState();
  const [temp, setTemp] = useState();
  const [description, setDiscription] = useState();
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();
  const apiKey = "83a16d65b49601f3000fbd4f7c4982f4";
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  async function clickHandler() {
    if (city === "") {
      return;
    }
    await axios
      .post(apiURL)
      .then((res) => {
        // if (res.data.cod === "404") {
        //   container.current.style.height = "400px";
        //   weatherBox.current.style.display = "none";
        //   weatherDetails.current.style.display = "none";
        //   error.current.style.display = "block";
        //   error.current.classList.add("fade-in");
        //   return;
        // }
        console.log(res.data);
        error.current.style.display = "none";
        error.current.classList.remove("fade-in");
        setTemp(res.data.main.temp);
        setHumidity(res.data.main.humidity);
        setDiscription(res.data.weather[0].description);
        setWind(res.data.wind.speed);
        switch (res.data.weather[0].main) {
          case "Clear":
            setWeatherImage(clear);
            break;
          case "Clouds":
            setWeatherImage(cloud);
            break;
          case "Mist":
            setWeatherImage(mist);
            break;
          case "Rain":
            setWeatherImage(rain);
            break;
          case "Snow":
            setWeatherImage(snow);
            break;
        }
        weatherBox.current.style.display = "";
        weatherDetails.current.style.display = "";
        weatherBox.current.classList.add("fade-in");
        container.current.style.height = "590px";

      })
      .catch((err) => {
        console.log(err);
        container.current.style.height = "400px";
        weatherBox.current.style.display = "none";
        weatherDetails.current.style.display = "none";
        error.current.style.display = "block";
        error.current.classList.add("fade-in");
      });
  }

  return (
    <div className="container" ref={container}>
      <div className="search-box">
        <i className="fa-solid fa-location-dot"></i>
        <input type="text" placeholder="Enter Location" onChange={(e) => setCity(e.target.value)} />
        <button className="fa-solid fa-magnifying-glass" onClick={clickHandler}></button>
      </div>
      <div className="not-found" ref={error}>
        <img src={notFound} alt="404 Not Found" />
        <p>Invalid Location</p>
      </div>
      <div className="weather-box" ref={weatherBox}>
        <img src={weatherImage} />
        <p className="temperature">{`${temp}°C`}</p>
        <p className="description">{description}</p>
      </div>
      <div className="weather-details" ref={weatherDetails}>
        <div className="humidity">
          <i className="fa-solid fa-water"></i>
          <div className="text">
            <span>{`${humidity}%`}</span>
            <p>Humidity</p>
          </div>
        </div>
        <div className="wind">
          <i className="fa-solid fa-wind"></i>
          <div className="text">
            <span>{`${wind}Km/H`}</span>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
