import React, { useState, useEffect } from "react";
import axios from "axios";
import TradeSelector from "./Components/TradeSelector/TradeSelector";
import "./App.css";
import data from "./mockdata";
import JobList from "./Components/JobList/JobList";
import MapList from "./Components/MapList/MapList";

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

const findAllMatchingTrades = (type, currentCoords) => {
  return data.reduce((joblist, job) => {
    if (job.$trade === type) {
      const jobLocation = {
        lat: job.$propertyLocation.coords.latitude,
        lng: job.$propertyLocation.coords.longitude,
      };
      if (getDistance(currentCoords, jobLocation) <= 40) {
        return [...joblist, job];
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
  const [location, setLocation] = useState("");
  const [currentCoords, setCurrentCoords] = useState("");

  const updateLocation = ({ target }) => {
    setLocation(target.value);
  };

  const updateCoords = async () => {
    if (!location) {
      return;
    }
    const data = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=KEY`,
    );
    setCurrentCoords(data.data.results[0].geometry.location);
  };

  const handleSelection = (trade) => {
    setJobs([currentCoords, ...findAllMatchingTrades(trade, currentCoords)]);
  };
  const updateMedia = () => {
    setDesktop(window.innerWidth > 1024);
  };

  const [isDesktop, setDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <div className="App">
      <header className="App-header"></header>
      <label htmlFor="location">Where are you?</label>
      <input
        name="location"
        onBlur={updateCoords}
        onChange={updateLocation}
        value={location}
      />
      <TradeSelector trades={trades} handleSelection={handleSelection} />
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

export default App;
