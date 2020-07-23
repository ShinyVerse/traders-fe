import React from "react";
import styled from "styled-components";

const JobList = ({ jobs, selectedJob, selectJob }) => {
  return (
    <Wrapper>
      <ul className="list">
        {jobs.map((job, index) => {
          if (index === 0) {
            return;
          }
          let isSelected = job === selectedJob;
          return (
            <li
              className={`list-item ${isSelected ? "selected" : "none"}`}
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @keyframes raise {
    100% {
      -webkit-box-shadow: 3px 9px 20px 0px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 3px 9px 20px 0px rgba(0, 0, 0, 0.75);
      box-shadow: 3px 9px 20px 0px rgba(0, 0, 0, 0.75);
    }
  }

  .list {
    position: absolute;
    top: 200px;
    width: 49.5%;
    list-style: none;
    margin: 0 10px;
    padding: 0;
    overflow-y: scroll;
    height: calc(100vh - 300px);
  }

  .list-item {
    font-size: 1.2em;
    width: 40%;
    margin: 20px auto;
    border: rgb(201, 201, 201) 1px solid;
    border-radius: 10px;
    padding: 20px;
  }

  .selected {
    animation: raise 0.4s ease;
    animation-fill-mode: forwards;
  }
`;

export default JobList;
