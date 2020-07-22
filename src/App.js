import React, { useState } from "react";
import TradeSelector from "./Components/TradeSelector/TradeSelector";
import "./App.css";
import data from "./mockdata";
import JobList from "./Components/JobList/JobList";
import MapList from "./Components/MapList/MapList";
import JobPopUp from "./Components/JobPopUp/JobPopUp";

const staticStartingPoint = {
  lat: 40.71,
  lng: -74.0,
};

const trades = data.reduce((joblist, job) => {
  return joblist.includes(job.$trade) ? joblist : [...joblist, job.$trade];
}, []);

var rad = function (x) {
  return (x * Math.PI) / 180;
};

var getDistance = function (p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) *
      Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return (d / 1609.344).toFixed(1); //returns miles
  // return d; // returns the distance in meter
};

const findAllMatchingTrades = (type) => {
  // console.log(data.map((job) => job.$description));
  return data.reduce((joblist, job) => {
    if (job.$trade === type) {
      const jobLocation = {
        lat: job.$propertyLocation.coords.latitude,
        lng: job.$propertyLocation.coords.longitude,
      };
      if (getDistance(staticStartingPoint, jobLocation) <= 40) {
        return [...joblist, job];
      }
      return joblist;
    } else {
      return joblist;
    }
  }, []);
};

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleSelection = (trade) => {
    console.log("TRADE!", findAllMatchingTrades(trade));
    setJobs(findAllMatchingTrades(trade));
  };

  return (
    <div className="App">
      <header className="App-header">
        <TradeSelector trades={trades} handleSelection={handleSelection} />
        {jobs.length >= 1 && (
          <MapList
            selectJob={(job) => {
              console.log(job);

              setSelectedJob(job);
            }}
            centerCoords={staticStartingPoint}
            jobs={jobs}
          />
        )}
        {selectedJob && <JobPopUp job={selectedJob} />}
      </header>
    </div>
  );
}

export default App;
