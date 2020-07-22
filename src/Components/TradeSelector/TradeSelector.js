import React, { useState } from "react";

const TradeSelector = ({ trades, handleSelection }) => {
  const [trade, setTrade] = useState("");

  const handleTrade = ({ target }) => {
    setTrade(target.value);
  };

  return (
    <div>
      <label htmlFor="trades">Select your trade:</label>
      <select
        onChange={handleTrade}
        data-testid="trade-select"
        name="trades"
        id="trades"
      >
        <option
          data-testid="default-blank-option"
          key="default-blank-option"
          value=""
        />
        {trades.map((trade) => {
          return (
            <option data-testid="trade" key={trade} value={trade}>
              {trade}
            </option>
          );
        })}
      </select>
      <button data-testid="trade-button" onClick={() => handleSelection(trade)}>
        find jobs
      </button>
    </div>
  );
};

TradeSelector.defaultProps = {
  trades: [],
};

export default TradeSelector;
