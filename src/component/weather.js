import React, { useEffect, useState } from "react";
import "./style.css";
import SearchIcon from "@material-ui/icons/Search";
// import Clock from "react-live-clock";

import "moment-timezone";
const Weatherapp = () => {
  const [cityTemp, setCityTemp] = useState(null);
  const [cityCountry, setCityCountry] = useState(null);
  const [cityWind, setCityWind] = useState(null);
  // const [cityWeather, setCityWeather] = useState("weather");
  const [InputTypeData, setInputTypeData] = useState();
  const [search, setSearch] = useState("agra");
  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=f34264ecc997e24bbdccaa92825e78bc`;
      const response = await fetch(url);
      const resJson = await response.json();
      setCityTemp(resJson.main);
      setCityCountry(resJson.sys);
      setCityWind(resJson.wind);
      // setCityWeather(resJson.weather[0]);
    };
    fetchApi();

    console.log(cityTemp);
  }, [search]);

  const inputFun = (e) => {
    setInputTypeData(e.target.value);
  };
  const SearchMe = () => {
    if (InputTypeData == null) {
      alert("Plz Enter Place");
    } else {
      setSearch(InputTypeData);
    }
  };

  // Live Time Function

  const Time = new Date().toLocaleTimeString();
  const [Ctime, setCTime] = useState(Time);
  const TimeMe = () => {
    const Time = new Date().toLocaleTimeString();
    setCTime(Time);
  };
  setInterval(TimeMe, 1000);
  return (
    <>
      <section className="containers d-flex flex-wrap">
        {/* Input section */}

        <div className="col-12 searchDivHeight">
          <input
            type="search"
            className="col-md-6 col-6 ms-5 mt-5"
            placeholder="Type your city Name"
            onChange={inputFun}
          />
          <button onClick={SearchMe} className="myseacrhBtn">
            <SearchIcon />
          </button>
          <span className="time fontSize1  mt-5">
            <p onLoad={TimeMe}>{Ctime}</p>
          </span>
        </div>

        {/* Contry section */}

        {!cityCountry || !cityTemp || !cityWind ? (
          <p className="col-12 inner text-center fontSize2 text-warning vh-100">
            no data found
          </p>
        ) : (
          <>
            <div className="col-md-4 col-12 divHeightLocation ">
              <div className="location ">
                <h1 className="locationFont ps-5 fontSize3">{search}</h1>
                <small className="ps-5 fontSize1">{cityCountry.country}</small>
              </div>
            </div>

            {/* tempracher section round */}

            <div className="col-md-4 col-12   roundMainDiv">
              <div className="roundDiv">
                <div className="roundInnerDit inner text-center">
                  <p className="fontSize2 tempText p-0">
                    <strong>{cityTemp.temp}</strong> &#x2103;
                  </p>
                  <p className="fontSize1 text-white">temperature</p>

                  {/* humidity  */}

                  <p className="fontSize2 m-0 p-0">
                    <div className="HumidityDot"></div>{" "}
                    <strong>{cityTemp.humidity} &#x25;</strong>{" "}
                  </p>
                  <p className="fontSize1 text-white">Humidity</p>
                </div>
              </div>
            </div>

            {/* Right Section  */}

            <div className="col-md-4 col-12  mainrightDiv  ">
              <div className="col-12 allDivHeight  rightMainDiv overflow-hidden inner text-center">
                <label className="tempTextRightDiv fontSize1-2">
                  <strong>
                    {/* <i className="fas fa-cloud-sun fa-2x my-3"></i> */}
                    Real Feel
                  </strong>
                  <p>
                    {cityTemp.feels_like} &#x2103;
                    {/* &nbsp; <span>{cityWeather.main}</span> */}
                  </p>
                </label>

                <hr />
                <label className="tempTextRightDiv fontSize1-2">
                  <strong>pressure</strong>
                </label>
                <p>{cityTemp.pressure} mbar</p>
                <hr />
                <label className="tempTextRightDiv fontSize1-2">
                  <strong>Fahrenheit</strong>
                </label>
                {/* <p>   {Math.round(`${cityTemp.temp}`* 9/5) + 32} &#x2109;</p> */}
                <p>{Math.round((`${cityTemp.temp}` * 9) / 5) + 32} &#x2109;</p>
                <hr />
                <label className="tempTextRightDiv fontSize1-2">
                  <strong>wind</strong>
                </label>
                <p>{cityWind.speed} km/h</p>
                <hr />
                <label className="tempTextRightDiv fontSize1-2">
                  <strong>Min-Temp / Max-Temp</strong>
                </label>
                <p>
                  {cityTemp.temp_min} &#x2103; &nbsp; / &nbsp;{" "}
                  {cityTemp.temp_max} &#x2103;{" "}
                </p>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};
export default Weatherapp;
