import React from "react";

const JobList = ({ jobs, selectedJob, selectJob }) => {
  return (
    <ul>
      {jobs.map((job, index) => {
        if (index === 0) {
          return;
        }
        let isSelected = job === selectedJob;
        return (
          <li
            style={{
              border: isSelected ? "green solid 5px" : "black solid 1px",
              marginBottom: "10px",
            }}
            key={job.$id}
            onClick={() => {
              selectJob(job);
            }}
          >
            <p>Skill required: {job.$skill}</p>
            <p>Reported issue: {job.$description}</p>
            <p>Reported issue: {job.$claims[0].claimType}</p>
            <p>Estimated distance: {job.distanceFromTrader} miles</p>
          </li>
        );
      })}
    </ul>
  );
};

export default JobList;
