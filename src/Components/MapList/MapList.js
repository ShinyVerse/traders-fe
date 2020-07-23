import React from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import JobPopUp from "../JobPopUp/JobPopUp";
import "./MapList.css";

const Marker = ({ job, selectJob, cn }) => (
  <div
    onClick={() => {
      selectJob(job);
    }}
    key={job.id}
    className={`marker ${cn}`}
  />
);

const TraderMarker = () => <div className="trader"></div>;

const MapList = ({ centerCoords, jobs, selectJob, selectedJob }) => {
  const zoom = 11;

  return (
    <Wrapper>
      {/* Important! Always set the container height explicitly */}

      {jobs.length > 0 ? (
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
  .map {
    height: 90vh;
    width: 100vw;
  }
  .nojobs {
    font-size: 1.2em;
    text-align: center;
    padding-top: 30px;
    width: 100%;
  }
  @media (min-width: 1024px) {
    .map {
      position: absolute;
      height: 100vh;
      width: 50vw;
      left: 50%;
    }
  }
`;

export default MapList;
