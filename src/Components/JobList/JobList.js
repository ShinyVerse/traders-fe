import React, { useState } from "react";

const JobList = ({ jobs }) => {
  return (
    <ul>
      {jobs.map((job) => {
        <li>{job.$skill}</li>;
      })}
    </ul>
  );
};

export default TradeSelector;
