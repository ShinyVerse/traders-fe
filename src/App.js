import React, { useState } from "react";
import TradeSelector from "./Components/TradeSelector/TradeSelector";
import "./App.css";
import data from "./mockdata";
import JobList from "./Components/JobList/JobList";

const trades = data.reduce((joblist, job) => {
  return joblist.includes(job.$trade) ? joblist : [...joblist, job.$trade];
}, []);

const findAllMatchingTrades = (type) => {
  // console.log(data.map((job) => job.$description));

  return data.reduce((joblist, job) => {
    if (job.$trade === type) {
      return [...joblist, job];
    } else {
      return joblist;
    }
  }, []);
};

function App() {
  const [jobs, setJobs] = useState([]);

  const handleSelection = (trade) => {
    console.log("TRADE!", findAllMatchingTrades(trade));
    setJobs(findAllMatchingTrades(trade));
  };
  return (
    <div className="App">
      <header className="App-header">
        <TradeSelector trades={trades} handleSelection={handleSelection} />
        {jobs.length >= 1 && <JobList jobs={jobs} />}
      </header>
    </div>
  );
}

export default App;
