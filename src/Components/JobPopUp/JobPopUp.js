import React from "react";

const JobPopUp = ({ job }) => {
  return (
    <div style={{ position: "absolute", bottom: 0, zIndex: 5000 }}>
      <p>Skill required: {job.$skill}</p>
      <p>Reported issue: {job.$description}</p>
      <p>Reported issue: {job.$claims[0].claimType}</p>
      {/* <p>Rough distance: {getDistance(client, trader)}</p> */}
    </div>
  );
};

export default JobPopUp;
