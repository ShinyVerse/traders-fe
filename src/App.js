import React from "react";
import TradeSelector from "./Components/TradeSelector/TradeSelector";
import "./App.css";
import data from "./mockdata";

const trades = data.reduce((joblist, job) => {
  return joblist.includes(job.$trade) ? joblist : [...joblist, job.$trade];
}, []);

const findAllMatchingTrades = (type) => {
  return data.reduce((joblist, job) => {
    return joblist.includes(type) ? joblist : [...joblist, job];
  }, []);
};

const handleSelection = (trade) => {
  console.log("TRADE!", trade);
  console.log("TRADE!", findAllMatchingTrades(trade));
  return findAllMatchingTrades(trade);
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TradeSelector trades={trades} handleSelection={handleSelection} />
      </header>
    </div>
  );
}

export default App;
