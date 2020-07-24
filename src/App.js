import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import "./App.css";
import data from "./mockdata";
import JobList from "./Components/JobList/JobList";
import MapList from "./Components/MapList/MapList";
import DropDown from "./Components/DropDown/DropDown";
import homeserveIcon from "./assets/homeserveIcon.png";

const trades = data.reduce((joblist, job) => {
  return joblist.includes(job.$trade) ? joblist : [...joblist, job.$trade];
}, []);

const rad = function (x) {
  return (x * Math.PI) / 180;
};

const getDistance = (p1, p2) => {
  const R = 6378137; // Earth’s mean radius in meter
  const dLat = rad(p2.lat - p1.lat);
  const dLong = rad(p2.lng - p1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) *
      Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return (d / 1609.344).toFixed(1); //returns miles
};

const findAllMatchingTrades = (type, currentCoords, distanceForTravel) => {
  return data.reduce((joblist, job) => {
    if (job.$trade === type) {
      const jobLocation = {
        lat: job.$propertyLocation.coords.latitude,
        lng: job.$propertyLocation.coords.longitude,
      };
      const distanceFromTrader = getDistance(currentCoords, jobLocation);
      if (distanceFromTrader <= Number(distanceForTravel)) {
        return [...joblist, { ...job, distanceFromTrader }];
      }
      return joblist;
    } else {
      return joblist;
    }
  }, []);
};

function App() {
  const [jobs, setJobs] = useState(null);

  const [selectedJob, setSelectedJob] = useState(null);
  const [currentCoords, setCurrentCoords] = useState("");

  const [form, setForm] = useState({
    location: "",
    maxDistance: null,
    trade: null,
  });

  const getTraderCoords = async () => {
    if (!form.location) {
      return;
    }
    try {
      const data = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${form.location}&key=${process.env.REACT_APP_GOOGLE_KEY}`,
      );
      return data.data.results[0].geometry.location;
    } catch (err) {
      //alert for user to go here
      return "";
    }
  };

  const getAvailableJobs = (coords) => {
    setJobs([
      coords,
      ...findAllMatchingTrades(form.trade, coords, form.maxDistance),
    ]);
  };

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1024);
  };

  const [isDesktop, setDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const onFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getJobs = async () => {
    for (let prop in form) {
      if (!form[prop]) {
        return;
      }
    }
    try {
      const coords = await getTraderCoords();
      setCurrentCoords(coords);
      getAvailableJobs(coords);
    } catch (err) {
      //alert for user to go here
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Wrapper>
        {isDesktop && <img src={homeserveIcon} className="logo" alt="logo" />}
        <div className="form">
          <label htmlFor="location">Your current location:</label>
          <input
            className="location"
            name="location"
            onChange={onFormChange}
            value={form.location}
          />

          <DropDown
            message={"Select your trade: "}
            options={trades}
            handleChange={onFormChange}
            name="trade"
          />
          <DropDown
            message={"Distance wishing to travel: "}
            options={[1, 5, 10, 20, 25, 40]}
            handleChange={onFormChange}
            name="maxDistance"
          />
          <button className="form-btn" onClick={getJobs}>
            find me jobs!
          </button>
        </div>
      </Wrapper>

      {jobs && (
        <MapList
          selectJob={(job) => {
            setSelectedJob(job);
          }}
          centerCoords={currentCoords}
          jobs={jobs}
          selectedJob={selectedJob}
        />
      )}
      {isDesktop && jobs && (
        <div style={{ position: "absolute", left: "0" }}>
          <JobList
            jobs={jobs}
            selectedJob={selectedJob}
            selectJob={setSelectedJob}
          />
        </div>
      )}
    </div>
  );
}

const Wrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: space-around;
    height: 160px;
    border: black solid 1px;
    border-radius: 10px;
    width: 90%;
    padding: 10px;
    margin: 5px auto;
    text-align: center;
  }

  .location {
    width: 100%;
    box-sizing: border-box;
  }

  label {
    margin-right: 10px;
  }

  .form-btn {
    width: 50%;
    align-self: center;
    border-radius: 10px;
    padding: 5px;
  }

  @media (min-width: 1024px) {
    .logo {
      display: inline-block;
      width: 100px;
      height: 100px;
    }
    .form {
      font-size: 1.5em;
      position: absolute;
      width: 35%;
      padding: 20px;
      margin: 10px;
      height: 200px;
      top: 2%;
      left: 120px;
      border: black solid 1px;
      border-radius: 10px;
    }
    .form-btn {
      width: 40%;
      font-size: 1em;
      margin-top: 2px;
    }

    .location {
      font-size: 1em;
    }
  }
`;

export default App;
