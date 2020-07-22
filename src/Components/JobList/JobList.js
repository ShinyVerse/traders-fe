import React from "react";

const JobList = ({ jobs }) => {
  return (
    <ul>
      {jobs.map((job) => {
        return (
          <li
            style={{ border: "black solid 1px", marginBottom: "10px" }}
            key={job.$id}
          >
            <p>Skill required: {job.$skill}</p>
            <p>Reported issue: {job.$description}</p>
            <p>Reported issue: {job.$claims[0].claimType}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default JobList;
