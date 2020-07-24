import React from "react";
import styled from "styled-components";

const JobPopUp = ({ job, takeJob }) => {
  return (
    <Wrapper>
      <div className="card">
        <p>Skill required: {job.$skill}</p>
        <p>Reported issue: {job.$description}</p>
        <p>Reported issue: {job.$claims[0].claimType}</p>
        <p>Estimated distance: {job.distanceFromTrader}</p>
        <button onClick={() => takeJob(job.$id)}>take job</button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @keyframes popUp {
    0% {
      margin-top: 200px;
    }

    100% {
      margin-top: 0px;
    }
  }

  .card {
    animation: popUp 0.3s ease;
    position: absolute;
    bottom: 0;
    z-index: 5000;
    background-color: white;
    height: 200px;
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    text-align: center;
  }

  @media (min-width: 1024px) {
    .card {
      opacity: 0;
    }
  }
`;

export default JobPopUp;
