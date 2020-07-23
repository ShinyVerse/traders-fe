import React from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import JobPopUp from "../JobPopUp/JobPopUp";
import homeserveIcon from "../../assets/homeserveIcon.png";

const Marker = ({ job, selectJob, cn }) => (
  <img
    onClick={() => {
      selectJob(job);
    }}
    key={job.id}
    alt="icon"
    src={homeserveIcon}
    className={`marker ${cn}`}
  />
);

const TraderMarker = () => <div className="trader"></div>;

const MapList = ({ centerCoords, jobs, selectJob, selectedJob }) => {
  const zoom = 12;

  return (
    <Wrapper>
      {jobs.length > 1 ? (
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: KEY,
            }}
            defaultCenter={centerCoords}
            defaultZoom={zoom}
          >
            {jobs.map((job, index) => {
              let isSelected = job === selectedJob;
              let isTrader = index === 0;
              if (isTrader) {
                return (
                  <TraderMarker
                    key={`marker-${index}`}
                    lat={centerCoords.lat}
                    lng={centerCoords.lng}
                  />
                );
              } else {
                return (
                  <Marker
                    cn={isSelected ? "selected" : "none"}
                    selectJob={selectJob}
                    job={job}
                    key={`marker-${index}`}
                    lat={job.$propertyLocation.coords.latitude}
                    lng={job.$propertyLocation.coords.longitude}
                  />
                );
              }
            })}
          </GoogleMapReact>
          {selectedJob && <JobPopUp job={selectedJob} />}
        </div>
      ) : (
        <div className="nojobs">
          Sorry! No current jobs in your area, please check back soon!
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @keyframes expand {
    0% {
      width: 30px;
      height: 30px;
    }

    100% {
      width: 45px;
      height: 45px;
    }
  }

  @keyframes expandMob {
    0% {
      width: 20px;
      height: 20px;
    }

    100% {
      width: 25px;
      height: 25px;
    }
  }

  .map {
    height: 90vh;
    width: 100vw;
  }
  .marker:active,
  .marker:hover {
    background-color: black;
  }

  .marker {
    z-index: 1000;
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    margin: auto;
  }

  .trader {
    z-index: 1100;
    position: relative;
    width: 18px;
    height: 18px;
    background-color: yellow;
    border: 2px solid black;
    border-radius: 100%;
  }

  .selected {
    z-index: 800;
    animation: expandMob 0.3s ease;
    background-color: black;
    width: 25px;
    height: 25px;
    animation-fill-mode: forwards;
  }

  .nojobs {
    font-size: 1.2em;
    text-align: center;
    padding-top: 30px;
    width: 100%;
  }
  @media (min-width: 1024px) {
    .map,
    .nojobs {
      position: absolute;
      height: 100vh;
      width: 50vw;
      left: 50%;
      top: 0;
    }
    .selected {
      width: 45px;
      height: 45px;
      animation: expand 0.3s ease;
      animation-fill-mode: forwards;
    }

    .marker {
      width: 30px;
      height: 30px;
    }
  }
`;

export default MapList;
