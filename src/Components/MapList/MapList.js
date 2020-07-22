import React from "react";
import GoogleMapReact from "google-map-react";
import "./MapList.css";

const Marker = ({ job, selectJob }) => (
  <div
    onClick={() => {
      selectJob(job);
    }}
    key={job.id}
    className="marker"
  />
);

const MapList = ({ centerCoords, jobs, selectJob }) => {
  console.log(centerCoords);

  const zoom = 11;

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: KEY }}
        defaultCenter={centerCoords}
        defaultZoom={zoom}
      >
        {jobs.map((job, index) => {
          return (
            <Marker
              selectJob={selectJob}
              job={job}
              key={`marker-${index}`}
              lat={job.$propertyLocation.coords.latitude}
              lng={job.$propertyLocation.coords.longitude}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

// const MapList = ({ jobs, centerCoords, selectJob }) => {
//   return (
//     <div style={{ height: "400px", width: "100%" }}>
//       <SimpleMap centerCoords={centerCoords} jobs={jobs} />
//     </div>
//   );
// };

export default MapList;
