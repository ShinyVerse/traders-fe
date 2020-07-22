import React from "react";
import GoogleMapReact from "google-map-react";

var rad = function (x) {
  return (x * Math.PI) / 180;
};

var getDistance = function (p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) *
      Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return (d / 1609.344).toFixed(2); //returns miles
  // return d; // returns the distance in meter
};
const Marker = ({ color }) => (
  <div
    style={{
      position: "relative",
      width: "18px",
      height: "18px",
      backgroundColor: "#000",
      border: "2px solid #fff",
      borderRadius: "100%",
    }}
  />
);

const SimpleMap = (coords) => {
  const zoom = 11;
  const center = {
    // lat: coords.coords.latitude,
    // lng: coords.coords.longitude,
    lat: 51.48,
    lng: 0.12,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "KEY" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {[
          {
            lat: 51.49,
            lng: 0.1,
          },
          center,
        ].map((place, index) => {
          return (
            <Marker key={`location-${index}`} lat={place.lat} lng={place.lng} />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

const JobList = ({ jobs }) => {
  return (
    <ul>
      {jobs.map((job) => {
        const client = {
          // lat: job.$propertyLocation.coords.latitude,
          // lng: job.$propertyLocation.coords.longitude,
          lat: 51.48,
          lng: 0.12,
        };

        const trader = {
          lat: 51.49,
          lng: 0.1,
        };

        return (
          <li
            style={{ border: "black solid 1px", marginBottom: "10px" }}
            key={job.$id}
          >
            <div style={{ height: "200px" }}>
              <SimpleMap coords={job.$propertyLocation.coords} />
            </div>

            <p>Skill required: {job.$skill}</p>
            <p>Reported issue: {job.$description}</p>
            <p>Reported issue: {job.$claims[0].claimType}</p>
            <p>Rough distance: {getDistance(client, trader)}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default JobList;
